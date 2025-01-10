exports.productBlock = function (name, reason, isBlocked) {
    return new Promise(async (resolve, reject) => {
        try {
            // Set the email subject and message based on block status
            const emailSubject = isBlocked
                ? "Important: Your Product Access Has Been Blocked"
                : "Good News: Your Product Access Has Been Restored";

            const actionMessage = isBlocked
                ? "Unfortunately, your product has been blocked due to the following reason:"
                : "Your product access has been restored. Here is the previous reason for blocking:";

            // Construct the email template
            let template = `
                <html>
                <head>
                    <title>${emailSubject}</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f8f9fa;
                            margin: 0;
                            padding: 20px;
                            display: flex;
                            justify-content: center;
                        }
                        .container {
                            max-width: 600px;
                            background-color: #ffffff;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
                        h1 {
                            font-size: 24px;
                            color: #333333;
                            margin-bottom: 10px;
                        }
                        p {
                            font-size: 16px;
                            color: #555555;
                            line-height: 1.6;
                        }
                        .reason {
                            font-weight: bold;
                            color: #d9534f;
                        }
                        .footer {
                            font-size: 12px;
                            color: #aaaaaa;
                            margin-top: 20px;
                        }
                        .footer a {
                            color: #007bff;
                            text-decoration: none;
                        }
                        .footer a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>${emailSubject}</h1>
                        <p>Hello ${name},</p>
                        <p>${actionMessage}</p>
                        <p class="reason">${reason || 'No specific reason provided.'}</p>
                        <p>If you have any questions or believe this action was taken in error, please contact our support team.</p>
                        <p>Thank you for your understanding.</p>
                        <div class="footer">
                            <p>&copy; 2025 ONSOK Inc. All rights reserved.</p>
                            <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            resolve(template);
        } catch (error) {
            reject(error);
        }
    });
};
