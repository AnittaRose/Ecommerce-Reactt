exports.BuyerUpgarde = function (userName, upgradeDetails) {
    return new Promise(async (resolve, reject) => {
        try {
            // Generate the email template
            let template = `
                <html>
                <head>
                <title>Seller Upgrade Notification</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #ffffff; color: #333333; }
                    .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { display: flex; justify-content: space-between; align-items: center; }
                    .header img { height: 30px; }
                    .header a { color: #004B91; text-decoration: none; margin-left: 10px; }
                    .order-confirmation { font-size: 24px; font-weight: bold; margin-top: 20px; }
                    .greeting { font-size: 18px; color: #E47911; margin-top: 20px; }
                    .message { font-size: 14px; margin-top: 10px; }
                    .order-summary { margin-top: 20px; }
                    .order-summary h2 { font-size: 18px; color: #E47911; }
                    .footer { font-size: 12px; margin-top: 20px; }
                    .footer a { color: #004B91; text-decoration: none; }
                </style>
                </head>
                <body>
                <div class="container">
                    <div class="header">
                        <h1>NOAV</h1>
                        <div>
                            <a href="#">Your Orders</a>
                            <a href="#">Your Account</a>
                            <a href="#">NOAV</a>
                        </div>
                    </div>
                    <div class="order-confirmation">Congratulations! You are now a Seller!</div>
                    <div class="greeting">Hi, ${userName}</div>
                    <div class="message">
                        Congratulations on being upgraded to a seller! You can now start listing your products on our platform and manage your store. We are excited to have you join the NOAV seller community.
                    </div>
                    <div class="order-summary">
                        <h2>Your Upgrade Details</h2>
                        <p><strong>Upgrade Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>Previous Role:</strong> Buyer</p>
                        <p><strong>New Role:</strong> Seller</p>
                        <p><strong>Upgrade Type:</strong> ${upgradeDetails.upgradeType}</p>
                    </div>
                    <div class="footer">
                        If you need any assistance or have any questions, feel free to contact us. 
                        <br/>
                        We are here to help you succeed as a seller.
                        <br/>
                        <strong>ONSOK</strong>
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
