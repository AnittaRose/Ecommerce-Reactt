
const users = require('../db/models/users');
const { successfunction, errorfunction } = require('../utils/responsehandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Category = require('../db/models/Categories');
const Addproduct = require('../db/models/Addpage');
const usertypes = require('../db/models/users_type');
const mongoose = require('mongoose');
const sendemail =require("../utils/send-emails").sendEmail;
const UpgradeRequest= require("../db/models/upgradeRequest");
// const BuyerUpgarde =require("../utils/emailtemplates/BuyerUpgarde")
const BuyerUpgarde = require("../utils/emailtemplates/Buyer").BuyerUpgarde
const userBlock = require("../utils/emailtemplates/userBlock").userBlock
const productBlock= require("../utils/emailtemplates/Product").productBlock

// const fileUpload = require('../utils/upload').fileUpload;


// exports.Createusers = async function (req, res) {
//     try {
//         const body = req.body;
//         console.log('Request body:', body);

//         const user_type = await usertypes.findOne({ user_type: body.user_type });
//         if (!user_type) {
//             return res.status(400).send({
//                 success: false,
//                 message: "User type not found."
//             });
//         }
//         body.user_type = user_type._id;

//         const userExists = await users.exists({ email: body.email });
//         if (userExists) {
//             return res.status(400).send(errorfunction({
//                 statuscode: 400,
//                 message: "User already exists",
//             }));
//         }

//         body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
//         const newUser = await users.create(body);

//         return res.status(200).send(successfunction({
//             success: true,
//             statuscode: 200,
//             message: "User added successfully",
//             data: newUser
//         }));
//     } catch (error) {
//         console.error('Error in Createusers:', error);
//         return res.status(500).send(errorfunction({
//             statuscode: 500,
//             message: "An error occurred while creating the user.",
//             error: error.message
//         }));
//     }
// };
exports.Createusers = async function (req, res) {
    try {
        const body = req.body;
        console.log('Request body:', body);

        // Check if user_type is provided, otherwise set default to "Buyer"
        const userTypeName = body.user_type || "Buyer";

        // Find the user type in the database
        const user_type = await usertypes.findOne({ user_type: userTypeName });
        if (!user_type) {
            return res.status(400).send({
                success: false,
                message: "User type not found."
            });
        }
        body.user_type = user_type._id;

        // Check if the user already exists
        const userExists = await users.exists({ email: body.email });
        if (userExists) {
            return res.status(400).send(errorfunction({
                statuscode: 400,
                message: "User already exists",
            }));
        }

        // Hash the password before saving
        body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
        const newUser = await users.create(body);

        return res.status(200).send(successfunction({
            success: true,
            statuscode: 200,
            message: "User added successfully",
            data: newUser
        }));
    } catch (error) {
        console.error('Error in Createusers:', error);
        return res.status(500).send(errorfunction({
            statuscode: 500,
            message: "An error occurred while creating the user.",
            error: error.message
        }));
    }
};

exports.view = async function (req, res) {
    try {
        const userTypes = await usertypes.find();
        return res.status(200).send(successfunction({
            success: true,
            statuscode: 200,
            message: "User types retrieved successfully",
            data: userTypes
        }));
    } catch (error) {
        console.error("Error in view function:", error);
        return res.status(500).send(errorfunction({
            success: false,
            statuscode: 500,
            message: "An error occurred while retrieving user types.",
            error: error.message
        }));
    }
};
exports.viewall = async function (req, res) {
    try {
        let section = await users.find();
        console.log('section', section);

        if (section) {
            res.status(200).json(section);
        } else {
            res.status(404).send('server error');
        }
    } catch (error) {
        console.log('error', error);

    }
}
exports.singleuser = async function (req, res) {

    try {
        let single_id = req.params.id;
        console.log('id from single', single_id);

        let one_data = await users.findOne({ _id: single_id })
        console.log('one_data', one_data);

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "single view success",
            data: one_data

        })
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {
        console.log("error", error);

        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"

        })
        res.status(response.statuscode).send(response)
        return;

    }
};
// In userController.js (or the file where deleteuser is defined)
exports.deleteuser = async function (req, res) {
    try {
        let delete_id = req.params.id;
        console.log('delete_id', delete_id);

        let delete_onedata = await users.deleteOne({ _id: delete_id });
        res.status(200).send(delete_onedata);
    } catch (error) {
        console.log('error', error);
        res.status(500).send({ error: 'Failed to delete user' });
    }
};
exports.edituser = async function (req, res) {
    try {
        let body = req.body;
        console.log('body', body);


        let data = {
            name: body.name,
            email: body.email,
            password: body.password,
            phoneno: body.phoneno,
            user_type: body.user_type
        }


        let id = req.params.id;

        let updatedata = await users.updateOne({ _id: id }, { $set: data });
        console.log('updatedata', updatedata);

        let strupdatedata = JSON.stringify(updatedata);
        console.log('strupdatedata', strupdatedata)

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: " updated Successfully",
            data: updatedata

        })
        res.status(response.statuscode).send(response)
        return;



    } catch (error) {

        console.log("error : ", error);
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"

        })
        res.status(response.statuscode).send(response)
        return;
    }
};

// exports.addproduct = async function (req, res) {
//     try {
//         const body = req.body;

//         console.log('Received Body:', body);

//         // Validate and find the category
//         const category = await Categories.findOne({ Category: body.Category });

//         if (!category) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Invalid Category.",
//             });
//         }

//         body.Category = category._id; // Set category ID for the product

//         // Check if files are uploaded
//         if (req.files && req.files.length > 0) {
//             // Handle image uploads
//             const imagePaths = req.files.map(file => {
//                 return file.path; // Use the relative file path stored by multer
//             });
//             body.Images = imagePaths; // Save the paths of uploaded images
//         } else {
//             return res.status(400).send({
//                 success: false,
//                 message: "No images uploaded.",
//             });
//         }

//         // Add the product
//         const newProduct = await Addproduct.create(body);
//         console.log('New Product:', newProduct);

//         return res.status(200).send({
//             success: true,
//             statusCode: 200,
//             message: "Product Added Successfully",
//             data: newProduct
//         });
//     } catch (error) {
//         console.error("Error:", error);
//         return res.status(500).send({
//             success: false,
//             statusCode: 500,
//             message: "An error occurred while adding the product.",
//             error: error.message
//         });
//     }
// };

exports.addproduct = async function (req, res) {
    try {
        const body = req.body;
        const { userId } = req.params;

        console.log('Received Body:', body);
        console.log('User ID:', userId);

        // Validate and find the category
        const category = await Categories.findOne({ Category: body.Category });
        if (!category) {
            return res.status(400).send({
                success: false,
                message: "Invalid Category.",
            });
        }

        body.Category = category._id;

        // Validate userId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({
                success: false,
                message: "Invalid or missing User ID.",
            });
        }

        // Convert userId to ObjectId
        body.userId =userId;

        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file => file.path);
            body.Images = imagePaths;
        } else {
            return res.status(400).send({
                success: false,
                message: "No images uploaded.",
            });
        }

        // Add the product
        const newProduct = await Addproduct.create(body);
        console.log('New Product:', newProduct);

        return res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Product Added Successfully",
            data: newProduct,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({
            success: false,
            statusCode: 500,
            message: "An error occurred while adding the product.",
            error: error.message,
        });
    }
};
exports.fetchCategory = async function (req, res) {
    try {

        let Category = await Categories.find();
        console.log("category", Category);



        let response = successfunction({
            success: true,
            statusCode: 200,
            data: Category,
            message: "Category Added Successfully"

        });
        res.status(response.statuscode).send(response);
        return;


    } catch (error) {
        console.log(error);
    }
}
exports.viewallproducts = async function (req, res) {
    try {
        let section = await Addproduct.find().populate('Category')
        console.log('section', section);

        if(section){
            let response = successfunction({
                success : true,
                message : "data fetched",
                statuscode : 200,
                data : section
            })
            return res.status(response.statuscode).send(response);
        }else{
            let response =errorfunction({
                success : false,
                statuscode : 400,
                message : "sinethibg went wrong"
            });
            return res.status(response.statuscode).send(response)
        }
    } catch (error) {
        console.log('error', error);

    }
};
exports.Sellerproducts = async function (req, res) {
    try {
        const loggedInSellerId = req.params.id;

        if (!loggedInSellerId) {
            console.error("No Seller ID provided in request parameters");
            const response = errorfunction({
                success: false,
                statuscode: 400,
                message: "Invalid request: Seller ID is required",
            });
            return res.status(response.statuscode).send(response);
        }

        console.log("Logged-in Seller ID:", loggedInSellerId);

        // Fetch all products not created by the logged-in seller
        const section = await Addproduct.find({ userId: { $ne: loggedInSellerId } }).populate('Category');

        console.log("Filtered Products:", section);

        if (section && section.length > 0) {
            const response = successfunction({
                success: true,
                message: "Data fetched successfully",
                statuscode: 200,
                data: section,
            });
            return res.status(response.statuscode).send(response);
        } else {
            const response = errorfunction({
                success: false,
                statuscode: 404,
                message: "No products found",
            });
            return res.status(response.statuscode).send(response);
        }
    } catch (error) {
        console.error('Error:', error);
        const response = errorfunction({
            success: false,
            statuscode: 500,
            message: "Internal server error",
        });
        return res.status(response.statuscode).send(response);
    }
};
exports.singleproductview = async function (req,res){
    try {
        let single_id = req.params.id;
        // console.log('id from single',single_id);
    
        let singledata = await Addproduct.findOne({_id: single_id}).populate('Category')
        // console.log('singledata',singledata);
    
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "singleProduct view success",
            data: singledata
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       } catch (error) {
        console.log("error",error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       }  

};
exports.soloUser = async function (req, res) {

    try {

        Singleid = req.params.id
        console.log("Singleid", Singleid);

        SingleData = await users.findOne({ _id: Singleid });
        console.log("SingleUser", SingleData);

        let response = successfunction({
            success: true,
            statuscode: 200,
            data: SingleData,
            message: "successfully get the single data.."
        });
        res.status(response.statuscode).send(response)
        return;

    } catch (error) {

        console.log("error : ", error);
        let response = errorfunction({
            success: false,
            statuscode: 400,

            message: "error"
        })
        res.status(response.statuscode).send(response)
        return;
    }

}
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        console.log("body dataaaaaaaaa",req.body);
        console.log("userID :",userId);

        // Validate quantity
        if (!quantity || quantity < 1) {
            let response = errorfunction({
                success: false,
                statuscode: 400,
                message: "Quantity must be at least 1"
            });
            return res.status(response.statuscode).send(response);
        }

        // Fetch user
        const user = await users.findById(userId);
        if (!user) {
            let response = errorfunction({
                success: false,
                statuscode: 404,
                message: "User not found!"
            });
            return res.status(response.statuscode).send(response);
        }

        // Fetch product
        const product = await Addproduct.findById(productId);
        if (!product) {
            let response = errorfunction({
                success: false,
                statuscode: 404,
                message: "Product not found!"
            });
            return res.status(response.statuscode).send(response);
        }

        const price = product.Price; // Get the price from the product

        // Check if the user already has a cart
        let cart = user.addCart[0]; // Assuming there's only one cart per user

        if (!cart) {
            // Create a new cart if none exists
            cart = { items: [], totalPrice: 0 };
            user.addCart.push(cart);
        }

        // Check if the product already exists in the cart
        const existingProductIndex = cart.items.findIndex(item => item.productId?.toString() === productId);

        if (existingProductIndex !== -1) {
            // Update quantity and price if product exists
            cart.items[existingProductIndex].quantity += quantity;
        } else {
            // Add the new product to the cart
            cart.items.push({ productId, quantity, price });
        }
        console.log(existingProductIndex)

        // Recalculate the cart's total price
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Save updated user data
        await user.save();

        let response = successfunction({
            success: true,
            statuscode: 200,
            data: user,
            message: "Item successfully added to the cart."
        });
        res.status(response.statuscode).send(response);
    } catch (error) {
        console.error("Error: ", error);
        let response = errorfunction({
            success: false,
            statuscode: 500,
            message: "Internal server error"
        });
        res.status(response.statuscode).send(response);
    }
};
exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId, Title, Price } = req.body;

        // Fetch user
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).send(
                errorfunction({
                    success: false,
                    statuscode: 404,
                    message: "User not found!"
                })
            );
        }

        // Fetch product
        const product = await Addproduct.findById(productId).lean();
        if (!product) {
            return res.status(404).send(
                errorfunction({
                    success: false,
                    statuscode: 404,
                    message: "Product not found!"
                })
            );
        }

        // Check if the product is already in the wishlist
        const isProductInWishlist = user.wishlist.some(
            (item) => item.productId.toString() === productId
        );
        if (isProductInWishlist) {
            return res.status(400).send(
                errorfunction({
                    success: false,
                    statuscode: 400,
                    message: "Product already in wishlist!"
                })
            );
        }

        // Add product to wishlist
        user.wishlist.push({
            productId,
            Title: product.Title || Price,
            Price: product.Price || Price,
        });

        // Save updated user data
        await user.save();

        return res.status(200).send(
            successfunction({
                success: true,
                statuscode: 200,
                data: { productId, Title: product.Title || Title, Price: product.Price || Price },
                message: "Item successfully added to the wishlist."
                
            })
        );
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).send(
            errorfunction({
                success: false,
                statuscode: 500,
                message: "Internal server error"
            })
        );
    }
};

// exports.ViewallSellerproducts = async function (req, res) {
//     try {
//         let section = await Addproduct.find()
//         console.log('section', section);

//         if(section){
//             let response = successfunction({
//                 success : true,
//                 message : "data fetched",
//                 statuscode : 200,
//                 data : section
//             })
//             return res.status(response.statuscode).send(response);
//         }else{
//             let response =errorfunction({
//                 success : false,
//                 statuscode : 400,
//                 message : "sinethibg went wrong"
//             });
//             return res.status(response.statuscode).send(response)
//         }
//     } catch (error) {
//         console.log('error', error);

//     }
// };


exports.ViewallSellerproducts = async function (req, res) {
    try {
        // Fetch all products and populate the 'Category' with the 'name' field
        const products = await Addproduct.find()
            .populate('Category', 'name');  // Populating 'name' field of the Category

        if (products) {
            return res.status(200).json({
                success: true,
                message: 'Products fetched successfully',
                data: products,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'No products found',
            });
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};









exports.wishlistaddedproducts = async function (req, res) {
    try {
        const { id } = req.params;  // Extract the 'id' from the request parameters

        // Ensure that 'users' model is properly defined
        if (!users) {
            let response = errorfunction({
                success: false,
                statuscode: 500,
                message: "Users model not defined"
            });
            return res.status(response.statuscode).send(response);
        }

        // Fetch wishlist data for the specific user from the 'users' model
        let section = await users.findOne({ _id: id }, { wishlist: 1 });  // Assuming '_id' is the unique identifier

        if (section && section.wishlist && section.wishlist.length > 0) {
            // Successfully fetched data, send response
            let response = successfunction({
                success: true,
                message: "Data fetched successfully",
                statuscode: 200,
                data: section.wishlist
            });
            return res.status(response.statuscode).send(response);
        } else {
            // No data found, send error response
            let response = errorfunction({
                success: false,
                statuscode: 404,  // No wishlist data for the user
                message: "No items found in the wishlist"
            });
            return res.status(response.statuscode).send(response);
        }
    } catch (error) {
        console.log('error', error);
        // Send internal server error in case of unexpected failure
        let response = errorfunction({
            success: false,
            statuscode: 500,
            message: "Something went wrong while fetching the wishlist data"
        });
        return res.status(response.statuscode).send(response);
    }
};
// exports.BlockSeller = async (req, res) => {
//     const { id } = req.params;  // Get seller ID from URL
//     const { isBlocked, reason } = req.body;  // Get block status and reason from request body

//     // Log incoming data
//     console.log("Received request to block/unblock seller with ID:", id);
//     console.log("Request Body:", req.body);  // Log the entire body for debugging

//     if (isBlocked === undefined || reason === undefined) {
//         return res.status(400).json({ message: "Block status or reason is missing" });
//     }

//     try {
//         // Find the seller by ID
//         const seller = await users.findById(id);

//         if (!seller) {
//             console.error(`Seller not found with ID: ${id}`);
//             return res.status(404).json({ message: "Seller not found" });
//         }

//         // Update the block status
//         seller.isBlocked = isBlocked;

//         // Save the updated seller
//         const updatedSeller = await seller.save();
//         console.log(`Seller status updated successfully: ${updatedSeller.isBlocked}`);
//         console.log(`Updated seller:`, updatedSeller);


//         // Return a successful response
//         res.status(200).json({
//             message: `Seller ${isBlocked ? "blocked" : "unblocked"} successfully`,
//             seller: updatedSeller,
//         });
//     } catch (error) {
//         console.error("Error updating block status:", error);
//         res.status(500).json({ message: "Error updating block status", error: error.message });
//     }
// };

exports.BlockSeller = async (req, res) => {
    const { id } = req.params;  // Get seller ID from URL
    const { isBlocked, reason } = req.body;  // Get block status and reason from request body

    console.log("Received request to block/unblock seller with ID:", id);
    console.log("Request Body:", req.body);

    if (isBlocked === undefined || reason === undefined) {
        return res.status(400).json({ message: "Block status or reason is missing" });
    }

    try {
        const seller = await users.findById(id);
        if (!seller) {
            console.error(`Seller not found with ID: ${id}`);
            return res.status(404).json({ message: "Seller not found" });
        }

        // Update the block status of the seller
        seller.isBlocked = isBlocked;
        const updatedSeller = await seller.save();

        console.log(`Seller status updated successfully: ${updatedSeller.isBlocked}`);

        // Construct the email content for the block/unblock status
        const emailTemplate = await userBlock(seller.name, reason, isBlocked);

        // Send the email using the sendEmail function
        try {
            await sendemail(seller.email, 'Seller Account Status Update', emailTemplate);
            console.log('Email sent successfully.');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        res.status(200).json({
            message: `Seller ${isBlocked ? "blocked" : "unblocked"} successfully`,
            seller: updatedSeller,
        });
    } catch (error) {
        console.error("Error updating block status:", error);
        res.status(500).json({ message: "Error updating block status", error: error.message });
    }
};


// exports.BlockSeller = async (req, res) => {
//     const { id } = req.params;  // Get seller ID from URL
//     const { isBlocked, reason } = req.body;  // Get block status and reason from request body

//     // Log incoming data
//     console.log("Received request to block/unblock seller with ID:", id);
//     console.log("Request Body:", req.body);  // Log the entire body for debugging

//     // Check if required fields are present
//     if (isBlocked === undefined || reason === undefined) {
//         return res.status(400).json({ message: "Block status or reason is missing" });
//     }

//     try {
//         // Find the seller by ID
//         const seller = await users.findById(id);

//         if (!seller) {
//             console.error(`Seller not found with ID: ${id}`);
//             return res.status(404).json({ message: "Seller not found" });
//         }

//         // Update the block status
//         seller.isBlocked = isBlocked;

//         // Save the updated seller
//         const updatedSeller = await seller.save();
//         console.log(`Seller status updated successfully: ${updatedSeller.isBlocked}`);
//         console.log(`Updated seller:`, updatedSeller);

//         // Send email to seller about block/unblock status
//         const emailSubject = isBlocked ? 'Your Seller Account has been Blocked' : 'Your Seller Account has been Unblocked';
//         const emailContent = `
//             <html>
//                 <body>
//                     <h2>Dear ${seller.name},</h2>
//                     <p>We would like to inform you that your seller account has been ${isBlocked ? 'blocked' : 'unblocked'}.</p>
//                     <p><strong>Reason for ${isBlocked ? 'Blocking' : 'Unblocking'}:</strong> ${reason}</p>
//                     <p>If you have any questions, feel free to contact us.</p>
//                     <br>
//                     <p>Best regards,</p>
//                     <p>Your Team</p>
//                 </body>
//             </html>
//         `;

//         console.log("Sending email to:", seller.email);  // Add log here

//         // Ensure sendemail function works and logs the result or error
//         try {
//             await sendemail(seller.email, emailSubject, emailContent);
//             console.log(`Email sent to seller ${seller.email}`);
//         } catch (emailError) {
//             console.error("Error sending email:", emailError);
//             return res.status(500).json({ message: "Error sending email", error: emailError.message });
//         }

//         // Return a successful response
//         res.status(200).json({
//             message: `Seller ${isBlocked ? "blocked" : "unblocked"} successfully`,
//             seller: updatedSeller,
//         });
//     } catch (error) {
//         console.error("Error updating block status:", error);
//         res.status(500).json({ message: "Error updating block status", error: error.message });
//     }
// };
exports.BlockBuyer = async (req, res) => {
    const { id } = req.params;  // Get buyer ID from URL
    const { isBlocked, reason } = req.body;  // Get block status and reason from request body

    // Log incoming data
    console.log("Received request to block/unblock buyer with ID:", id);
    console.log("Request Body:", req.body);  // Log the entire body for debugging

    // Validate input
    if (isBlocked === undefined || reason === undefined) {
        return res.status(400).json({ message: "Block status or reason is missing" });
    }

    try {
        // Find the buyer by ID
        const buyer = await users.findById(id);  // Assuming 'users' is the collection

        if (!buyer) {
            console.error(`Buyer not found with ID: ${id}`);
            return res.status(404).json({ message: "Buyer not found" });
        }

        // Update the block status
        buyer.isBlocked = isBlocked;

        // Save the updated buyer
        const updatedBuyer = await buyer.save();
        console.log(`Buyer status updated successfully: ${updatedBuyer.isBlocked}`);
        console.log(`Updated buyer:`, updatedBuyer);

        // Prepare email notification content
        const emailTemplate = await userBlock(buyer.name, reason, isBlocked);

        // Send the email using the sendemail function
        try {
            await sendemail(buyer.email, 'Account Status Update', emailTemplate);
            console.log('Email sent successfully.');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        // Return a successful response
        res.status(200).json({
            message: `Buyer ${isBlocked ? "blocked" : "unblocked"} successfully`,
            buyer: updatedBuyer,
        });

    } catch (error) {
        console.error("Error updating block status:", error);
        res.status(500).json({ message: "Error updating block status", error: error.message });
    }
};

exports.deleteproduct = async (req, res) => {
    try {
        const delete_id = req.params.id;
        console.log('delete_id:', delete_id);

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(delete_id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Attempt to delete the product
        const delete_onedata = await Addproduct.deleteOne({ _id: delete_id });
        console.log('Deleted Data:', delete_onedata);

        if (delete_onedata.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully", delete_onedata });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};
exports.singlecart = async function (req,res){
    try {
        let single_id = req.params.id;
        console.log('id from single',single_id);
    
        let singledata = await Addproduct.findOne({_id: single_id})
        console.log('singledata',singledata);
    
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "singleProduct view success",
            data: singledata
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       } catch (error) {
        console.log("error",error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       }  

};
exports.wishlistSingledata = async function (req, res) {
    try {
        let productId = req.params.id;
        console.log('Product ID from request:', productId);
    
        // Find the product from the Addproduct collection
        let singledata = await Addproduct.findOne({ _id: productId });
        console.log('Product data:', singledata);

        if (!singledata) {
            let response = errorfunction({
                success: false,
                statuscode: 404,
                message: "Product not found"
            });
            res.status(response.statuscode).send(response);
            return;
        }

        // Assuming the user ID is in req.user.id or you need to fetch from a token/session
        let user = await users.findOne({ _id: req.body.id });  // Adjust to the actual way you're handling user IDs

        if (!user) {
            let response = errorfunction({
                success: false,
                statuscode: 404,
                message: "User not found"
            });
            res.status(response.statuscode).send(response);
            return;
        }

        // Check if the product is already in the user's collection
        if (user.wishlist.includes(productId)) {  // Assuming 'wishlist' stores product IDs
            let response = errorfunction({
                success: false,
                statuscode: 400,
                message: "Product already in user's collection"
            });
            res.status(response.statuscode).send(response);
            return;
        }

        // Add the product to the user's wishlist
        user.wishlist.push(productId);  // Correct the variable name to productId
        await user.save(); // Save the updated user document

        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "Product added to user collection successfully",
            data: singledata
        });
        res.status(response.statuscode).send(response);
        return;
    
    } catch (error) {
        console.log("Error:", error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "Error occurred while processing your request"
        });
        res.status(response.statuscode).send(response);
        return;
    }
};
exports.deletewishlistproduct = async (req, res) => {
    try {
      const { id, productId } = req.params;
  
      // Use $pull to remove the product from the wishlist
      const updateResult = await users.findByIdAndUpdate(
        id,
        { $pull: { wishlist: { productId: productId } } },
        { new: true } // Return the updated document
      );
  
      // Check if the user exists
      if (!updateResult) {
        return res.status(404).json({
          success: false,
          statuscode: 404,
          data: null,
          message: "User not found",
        });
      }
  
      // Check if the product was removed (by comparing wishlist before and after)
      const productExists = updateResult.wishlist.some(
        (item) => item.productId.toString() === productId
      );
  
      if (productExists) {
        return res.status(400).json({
          success: false,
          statuscode: 400,
          data: null,
          message: "Product not found in wishlist",
        });
      }
  
      // Return the updated wishlist
      res.status(200).json({
        success: true,
        statuscode: 200,
        data: updateResult.wishlist,
        message: "Product removed from wishlist successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        statuscode: 500,
        data: null,
        message: "Internal Server Error",
      });
    }
};
exports.deleteaddtocarttproduct = async (req, res) => {
    try {
        const { id, productId } = req.params;

        // Use $pull with dot notation to target nested arrays in addCart.items
        const updateResult = await users.findOneAndUpdate(
            { _id: id },  // Match user by ID
            { $pull: { "addCart.items": { _id: productId } } },  // Remove the specific product by its _id
            { new: true }  // Return the updated document
        );

        // Check if the user or product exists
        if (!updateResult) {
            return res.status(404).json({
                success: false,
                statuscode: 404,
                message: "User or product not found",
            });
        }

        // Recalculate total price after removing the product
        const updatedAddCart = updateResult.addCart;
        if (updatedAddCart && updatedAddCart.items.length > 0) {
            updatedAddCart.totalPrice = updatedAddCart.items.reduce((sum, item) => sum + item.price, 0); // Adjust according to your schema
        } else {
            updatedAddCart.totalPrice = 0;
        }

        // Save the updated total price
        await users.updateOne(
            { _id: id },
            { $set: { "addCart.totalPrice": updatedAddCart.totalPrice } }
        );

        // Return the updated addCart
        res.status(200).json({
            success: true,
            statuscode: 200,
            data: updatedAddCart,
            message: "Product removed from addCart successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            statuscode: 500,
            data: null,
            message: "Internal Server Error",
        });
    }
};
// exports.getProductsByCategory = async (req, res) => {
//     try {
//         const { categoryId } = req.params;

//         // Validate category existence
//         const category = await Categories.findById(categoryId);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found' });
//         }

//         // Fetch products associated with the category
//         const products = await Addproduct.find({ category: categoryId }).populate('category');
//         return res.status(200).json({
//             category: Categories.Category, // Send category name
//             products
//         });
//     } catch (error) {
//         console.error('Error fetching products by category:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// };
exports.editsellerproduct = async function (req, res) {
    try {
        const body = req.body;

        // Validate Request Body
        if (!body.Title || !body.Description || !body.Price || !body.Stock || !body.Brand || !body.Category || !body.Images) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Missing required fields in the request body",
            });
        }

        const id = req.params.id;

        // Validate ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                success: false,
                statuscode: 400,
                message: "Invalid ID",
            });
        }

        const data = {
            Title: body.Title,
            Description: body.Description,
            Price: body.Price,
            Stock: body.Stock,
            Brand: body.Brand,
            Category: body.Category,
            Images: body.Images,
        };

        console.log('Update Data:', data);

        const updatedata = await Addproduct.updateOne(
            { _id: id },
            { $set: data }
        );

        console.log('Update Response:', updatedata);

        if (updatedata.modifiedCount === 0) {
            return res.status(404).send({
                success: false,
                statuscode: 404,
                message: "No matching document found or no fields updated",
            });
        }

        res.status(200).send({
            success: true,
            statuscode: 200,
            message: "Updated Successfully",
            data: updatedata,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({
            success: false,
            statuscode: 500,
            message: "An error occurred",
        });
    }
};
exports.updateCart = async (req, res) => {
    try {
        const { productId, newQuantity } = req.body;
        const {userId} = req.params;  // Extract userId from params

        // Log the userId to debug
        console.log("userId from request:", userId);

        // Check if the userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid user ID format." });
        }

        // Validate the quantity
        const quantity = parseInt(newQuantity, 10);
        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ success: false, message: "Quantity must be a positive number." });
        }

        // Find the user by userId
        const user = await users.findById(userId);
        if (!user) {
            console.log("User not found with ID:", userId); // Log for debugging
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // Assuming the cart is stored in user.addCart[0]
        const cart = user.addCart && user.addCart[0];
        if (!cart) {
            return res.status(400).json({ success: false, message: "Cart is empty!" });
        }

        // Find the product index in the cart
        const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart!" });
        }

        // Update the quantity of the product
        cart.items[productIndex].quantity = quantity;

        // Recalculate the total price (ensure the price is stored for each product)
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        // Save the updated cart back to the user's addCart array
        await user.save();

        // Respond with the updated cart
        res.status(200).json({ success: true, message: "Cart updated successfully.", cart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
};
exports.totalBuyers = async (req, res) => {
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const buyerType = await usertypes.findOne({ user_type: 'Buyer' });
        console.log("buyerType :",buyerType)
        
        if (!buyerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const buyerCount = await users.countDocuments({ user_type: buyerType._id });
        console.log(buyerCount)
        
        res.json({ totalBuyers: buyerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
};
exports.totalseller = async (req, res) => {
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const sellerType = await usertypes.findOne({ user_type: 'Seller' });
        console.log("sellerType :",sellerType)
        
        if (!sellerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const sellerCount = await users.countDocuments({ user_type: sellerType._id });
        console.log(sellerCount)
        
        res.json({ totalSeller: sellerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
};
exports.sellerDetails = async (req, res) =>{
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const sellerType = await usertypes.findOne({ user_type: 'Seller' });
        console.log("sellerType :",sellerType)
        
        if (!sellerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const sellerCount = await users.find({ user_type: sellerType._id });
        console.log(sellerCount)
        
        res.json({ totalSeller: sellerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
}  
exports.BuyerDetails = async (req, res) =>{
    try {
        // Step 1: Find the userType ID for "Buyer" from the userType collection
        const BuyerType = await usertypes.findOne({ user_type: 'Buyer' });
        console.log("BuyerType :",BuyerType)
        
        if (!BuyerType) {
            return res.status(404).json({ error: 'Buyer type not found' });
        }

        // Step 2: Count the users with the retrieved buyerType ID
        const BuyerCount = await users.find({ user_type: BuyerType._id });
        console.log(BuyerCount)
        
        res.json({ totalBuyer: BuyerCount });
    } catch (error) {
        console.error('Error finding total buyers:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the total buyers' });
    }
}
exports.order = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const products = req.body.products; // Array of products (productId, quantity)

        // Debugging logs
        console.log('Params:', req.params);
        console.log('Body:', req.body);

        // Validate inputs
        if (!userId || !products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: 'User ID and a list of products with quantities are required.' });
        }

        // Fetch the user
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        let totalOrderPrice = 0;
        let purchasedProducts = [];

        // Loop through the products and process the order
        for (let productData of products) {
            const { productId, quantity } = productData;

            if (!productId || !quantity || isNaN(quantity) || quantity <= 0) {
                return res.status(400).json({ message: 'Each product must have a valid Product ID and Quantity.' });
            }

            const product = await Addproduct.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${productId} not found.` });
            }
            console.log('Product:', product);

            // Ensure product price is a valid number
            const productPrice = parseFloat(product.Price);
            if (isNaN(productPrice)) {
                return res.status(400).json({ message: `Invalid price for product ${product.name}.` });
            }

            const productTotalPrice = productPrice * quantity;
            totalOrderPrice += productTotalPrice;

            // Ensure totalOrderPrice is a valid number
            if (isNaN(totalOrderPrice)) {
                return res.status(400).json({ message: 'Total order price calculation failed.' });
            }

            product.stock -= quantity;
            await product.save();

            purchasedProducts.push({
                productId: product._id,
                name: product.name,
                quantity,
                price: productTotalPrice,
                purchaseDate: new Date(),
            });
        }

        // Initialize buyNow or order if undefined
        if (!user.order) {
            user.order = { products: [], totalPrice: 0, purchaseDate: null };
        }
        if (!user.buyNow) {
            user.buyNow = { products: [], totalPrice: 0, purchaseDate: null };
        }

        // Update user's 'buyNow' field
        user.order.products.push(...purchasedProducts);
        user.order.totalPrice = isNaN(totalOrderPrice) ? 0 : totalOrderPrice; // Ensure totalPrice is a valid number
        user.order.purchaseDate = new Date();

        // Update buyNow field
        user.buyNow.products = purchasedProducts;
        user.buyNow.totalPrice = isNaN(totalOrderPrice) ? 0 : totalOrderPrice;
        user.buyNow.purchaseDate = new Date();

        await user.save();

        // Respond with success
        res.status(200).json({
            message: 'Bulk purchase successful.',
            buyNow: user.buyNow,
            totalPrice: user.buyNow.totalPrice,
            purchasedProducts: purchasedProducts,
        });
    } catch (error) {
        console.error('Error in buyNow:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
// exports.buyerUpgrade = async (req, res) => {
//     try {
//       const { userId } = req.params; // Get userId from request params
  
//       // Validate userId
//       if (!userId) {
//         return res.status(400).json({ message: 'User ID is required' });
//       }
  
//       // Find the user by ID
//       const user = await users.findById(userId);
  
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       // Check if the user is already a seller
//       if (user.user_type === 'Seller') {
//         return res.status(400).json({ message: 'User is already a seller' });
//       }
  
//       // Update the user's usertype to "Seller"
//       user.user_type = 'Seller';
//       await user.save();
  
//       res.status(200).json({
//         message: 'User successfully upgraded from buyer to seller',
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           user_type: user.user_type,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'An error occurred while upgrading the user to seller' });
//     }
//   };
   
exports.buyerUpgrade = async (req, res) => {
    try {
      const { userId } = req.params; // Get userId from request params
  
      // Validate userId
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Find the user by ID
      const user = await users.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the 'Seller' user_type from the usertype collection
      const userType = await usertypes.findOne({ user_type: 'Seller' });
  
      if (!userType) {
        return res.status(404).json({ message: 'User type "Seller" not found' });
      }
  
      // Check if the user is already a seller
      if (user.user_type.toString() === userType._id.toString()) {
        return res.status(400).json({ message: 'User is already a seller' });
      }
  
      // Check if the user is a buyer
      if (user.user_type.toString() === userType._id.toString()) {
        return res.status(400).json({ message: 'User must be a buyer to upgrade' });
      }
  
      // Update the user's usertype to "Seller" (by setting the ObjectId)
      user.user_type = userType._id;
      await user.save();
  
      res.status(200).json({
        message: 'User successfully upgraded from buyer to seller',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          user_type: user.user_type,  // Now it's the ObjectId of "Seller"
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while upgrading the user to seller' });
    }
};
exports.ViewOrders = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is passed as a URL parameter
        const user = await users.findById(userId, 'order'); // Fetch only the orders field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ order: user.order });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.ViewWishlist = async (req, res) => {
    try {
        const userId = req.params.userId; // Assuming the user ID is passed as a URL parameter
        const user = await users.findById(userId, 'wishlist'); // Fetch only the wishlist field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ wishlist: user.wishlist }); // Correctly return the wishlist
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.BlockProduct = async (req, res) => {
    const { id } = req.params;
    const { isBlocked, reason } = req.body;
    console.log("reson",reason);

    console.log("Received request to block/unblock product with ID:", id);
    console.log("Request Body:", req.body);

    if (isBlocked === undefined || reason === undefined) {
        return res.status(400).json({ message: "Block status or reason is missing" });
    }

    try {
        const product = await Addproduct.findById(id);

        if (!product) {
            console.error(`Product not found with ID: ${id}`);
            return res.status(404).json({ message: "Product not found" });
        }

        product.isBlocked = isBlocked;
        product.blockReason = isBlocked ? reason : null;

        const updatedProduct = await product.save();
        console.log(`Product status updated successfully: ${updatedProduct.isBlocked}`);
        console.log(`Updated product:`, updatedProduct);



        // Log the email before sending to ensure it's correct
         let seller = await users.findOne({_id : updatedProduct.userId});
         let seller_email = seller.email;      


        // Send email with error handling
        try {
            const emailTemplate = await productBlock(seller.name, reason, isBlocked);
            await sendemail(seller_email, 'Product Status Update', emailTemplate);
            console.log('Email sent successfully.');
        } catch (emailError) {
            // Log the complete email error object for debugging
            console.error('Failed to send email:', emailError);

            // Additional debug logging for emailError details
            if (emailError.response) {
                console.error('Email Error Response:', emailError.response);
            }
            if (emailError.code) {
                console.error('Email Error Code:', emailError.code);
            }
        }

        res.status(200).json({
            message: `Product ${isBlocked ? "blocked" : "unblocked"} successfully`,
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Error updating block status:", error);
        res.status(500).json({ message: "Error updating block status", error: error.message });
    }
};



exports.gotoCart = async (req, res) => {
    try {
      // Extract the user ID from the route parameters
      const userId = req.params.userId;
  
      // Validate the userId format
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send('Invalid user ID format');
      }
  
      // Find the user and retrieve their cart items
      const user = await users
        .findById(userId)
        .select('addCart') // Select only the addCart field
        .populate({
          path: 'addCart.items.productId', // Populate product details from the 'products' collection
          model: 'AddProduct', // Ensure to use the correct Product model for the population
        });
  
      // Log the result for debugging
      console.log('User Data:', JSON.stringify(user, null, 2));
  
      // Check if the user exists and has cart items
      if (!user) {
        return res.status(404).send('User not found');
      }
      if (!user.addCart || user.addCart.length === 0 || !user.addCart[0].items || user.addCart[0].items.length === 0) {
        return res.status(404).send('No cart items found for this user');
      }
  
      // Extract the first addCart entry and its items
      const cartItems = user.addCart[0].items;
  
      // Log cart items for debugging
      console.log('Cart Items:', JSON.stringify(cartItems, null, 2));
  
      // Return the cart products
      res.json({ cartItems });
    } catch (error) {
      // Log error details for debugging
      console.error('Error:', error.message);
      res.status(500).send(`Failed to load cart: ${error.message}`);
    }
};
exports.sellerAddedProducts = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Check if user exists
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch products added by the seller
        const products = await Addproduct.find({ userId: userId });

        // Return response
        res.status(200).json({ 
            count: products.length, 
            products 
        });
    } catch (error) {
        console.error('Error fetching seller-added products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteuser = async(req,res)=>{
    try {
        const delete_id = req.params.id;
        console.log('delete_id:', delete_id);

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(delete_id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Attempt to delete the product
        const delete_onedata = await users.deleteOne({ _id: delete_id });
        console.log('Deleted Data:', delete_onedata);

        if (delete_onedata.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully", delete_onedata });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
}
exports.SingleproductEdit = async (req,res) =>{
    try {
        let single_id = req.params.id;
        console.log('id from single',single_id);
    
        let singledata = await Addproduct.findOne({_id: single_id})
        console.log('singledata',singledata);
    
        let response = successfunction({
            success: true,
            statuscode: 200,
            message: "singleProduct view success",
            data: singledata
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       } catch (error) {
        console.log("error",error);
    
        let response = errorfunction({
            success: false,
            statuscode: 400,
            message: "error"
            
        })
        res.status(response.statuscode).send(response)
        return;
    
       }  
}
exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedData = req.body;
  
      const updatedProduct = await Addproduct.findByIdAndUpdate(productId, updatedData, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct,
      });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ success: false, message: 'Failed to update product' });
    }
};
exports.deleteseedetailsproducts = async (req,res) =>{
    try {
        const delete_id = req.params.id;
        console.log('delete_id:', delete_id);

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(delete_id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        // Attempt to delete the product
        const delete_onedata = await Addproduct.deleteOne({ _id: delete_id });
        console.log('Deleted Data:', delete_onedata);

        if (delete_onedata.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({ message: "Product deleted successfully", delete_onedata });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Internal Server Error", error });
    }

}


exports.deletewishlistproducts = async (req, res) => {
    try {
      const { itemId } = req.params; // productId ലഭിക്കുന്നു
  
      // Find the user and remove the product from their wishlist
      const user = await users.findOneAndUpdate(
        { "wishlist.productId": itemId },  // Check if the product exists in the wishlist
        { $pull: { wishlist: { productId: itemId } } }, // Remove the product by productId
        { new: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'Wishlist item not found.' });
      }
  
      res.status(200).json({ message: `Wishlist product with ID: ${itemId} deleted successfully.` });
    } catch (error) {
      console.error('Error deleting wishlist product:', error);
      res.status(500).json({ message: 'Failed to delete wishlist product. Please try again later.' });
    }
};


exports.deleteaddtocarttproducts = async (req, res) => {
    const { userId } = req.params; // Assuming the user ID is in the params
    const { productId } = req.body; // Extract productId from the request body

    try {
        // Find and update the user's cart
        const updatedUser = await users.findByIdAndUpdate(
            userId,
            {
                $pull: { 'addCart.0.items': { productId } } // Pull the item with the matching productId from the first cart (index 0)
            },
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming addCart[0] is the cart you're working with
        const remainingItems = updatedUser.addCart[0].items;
        const updatedTotalPrice = remainingItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

        // Update the totalPrice field in the document
        updatedUser.addCart[0].totalPrice = updatedTotalPrice;
        await updatedUser.save();

        res.status(200).json({
            message: 'Product removed from cart successfully',
            cart: updatedUser.addCart[0], // Return the updated first cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error });
    }
};
  


exports.UpgradeRequest = async (req, res) => {
    try {
      const { userId, companyName, licenseNumber } = req.body;
  
      if (!userId || !companyName || !licenseNumber) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Create a new upgrade request
      const newRequest = new UpgradeRequest({
        userId,
        companyName,
        licenseNumber,
        status: 'pending',  // Default status is 'pending'
      });
  
      // Save the request to the database
      await newRequest.save();
  
      // Respond with a success message
      return res.status(200).json({ message: 'Upgrade request submitted successfully!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error processing the upgrade request', error: error.message });
    }
};

exports.getAllUpgradeRequests = async (req, res) => {
    try {
      // Fetch all upgrade requests from the database
      const upgradeRequests = await UpgradeRequest.find();
  
      // If there are no requests, return a message
      if (upgradeRequests.length === 0) {
        return res.status(404).json({ message: 'No upgrade requests found' });
      }
  
      // Send the list of upgrade requests as the response
      res.status(200).json(upgradeRequests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching upgrade requests' });
    }
};

exports.approveupgrade = async (req, res) => {
    try {
        const { userId } = req.params;

        // Log the userId for debugging
        console.log('Received userId:', userId);
        console.log('Request params:', req.params);  // Log entire request params for debugging

        // Ensure userId matches correctly and query the UpgradeRequest collection
        const request = await UpgradeRequest.findOne({ userId: String(userId) });

        if (!request) {
            console.log('No request found with userId:', userId);
            return res.status(404).json({ message: 'Request not found' });
        }

        // Update request status
        request.status = 'approved';
        await request.save();

        // Fetch user details
        const user = await users.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(userId) }, // Correctly using ObjectId
            { role: 'seller' },
            { new: true }
        );

        if (!user) {
            console.log('User not found with userId:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        // Prepare upgrade details for email
        const upgradeDetails = {
            upgradeType: 'Manual Upgrade from Admin',  // You can change this depending on the upgrade type
        };

        // Prepare the email content
        const emailTemplate = await BuyerUpgarde(user.name, upgradeDetails);
     


        // Send the email using the sendEmail function
        try {
            await sendemail(user.email, 'Seller Upgrade Notification', emailTemplate);
            console.log('Email sent successfully.');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        // Send the updated user information back
        res.status(200).json({ message: 'Request approved and role updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

exports.categoryy = async (req, res) => {
    try {
      // Fetch categories from the database
      const categories = await Categories.find(); // Modify this query based on your model
  
      // If categories are not found
      if (!categories || categories.length === 0) {
        return res.status(404).json({ message: 'No categories found' });
      }
  
      // Send the categories as a JSON response
      res.status(200).json({
        data: categories
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

  
  
  
  
  
  
  
  

  
  
  






  

  
    
  
  



