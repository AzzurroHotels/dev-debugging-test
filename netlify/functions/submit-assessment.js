// netlify/functions/submit-assessment.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('Function called');
    const data = JSON.parse(event.body);
    console.log('Data parsed:', { from: data.from, to: data.to, subject: data.subject });
    
    // Send to Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_cqpzjB93_E9CoX11qBh6ffQzfVw2h5h2v',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from:'Dev Test <dev-test@interview.azzurrohotels.com>',
        to: data.to,
        subject: data.subject,
        html: data.html
      })
    });

    const result = await response.text();
    console.log('Resend response status:', response.status);
    console.log('Resend response:', result);

    let jsonResult;
    try {
      jsonResult = JSON.parse(result);
    } catch (e) {
      jsonResult = { raw: result };
    }

    if (response.ok) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify({ success: true, data: jsonResult })
      };
    } else {
      console.error('Resend API error:', response.status, jsonResult);
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Email sending failed', 
          details: jsonResult,
          status: response.status 
        })
      };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      })
    };
  }
};
