
✨ Welcome to the Pre-Hackathon Assignment: Social Media Performance Analysis submission by Null Pointers. Our team consists of:

Sara Gorule
Ritesh Gharat
Smit Barve
Prashant Dhuri

🔧 Assignment Overview
🎡 Objective
To develop a basic analytics module leveraging Langflow and DataStax Astra DB for analyzing engagement data from mock social media accounts.


🛠️ Tools and Technologies Used:
📀 DataStax Astra DB for scalable database operations.
🔄 Langflow for workflow creation and GPT integration.
📈 Task Breakdown
1. 🔍 Fetch Engagement Data
Simulated dataset includes metrics like:
❤️ Likes
💪 Shares
💬 Comments
Post types (e.g., 🎢 carousel, 🎥 reels, 🖼️ static images).
Data is stored in DataStax Astra DB.
2. 🔄 Analyze Post Performance
A Langflow workflow was created to:
💡 Accept input for post types.
🔎 Query the dataset in Astra DB.
📈 Calculate average engagement metrics for each post type.
3. 🕵️ Provide Insights
Integrated GPT within Langflow to deliver actionable insights such as:
"🎢 Carousel posts have 20% higher engagement than static posts."
"🎥 Reels generate 2x more comments compared to other formats."
🔢 How It Works
🔀 LangFlow Workflow Steps:
🔀 Take Input: Accepts post type as input.
🔍 Retrieve Data: Queries the Astra DB for engagement metrics.
🔑 Extract User ID: Extracts user-specific data from the input.
🔏 Filter Data: Filters data based on User ID.
🔢 Calculate Averages: Computes engagement averages for different post types.
🧲 Input to Model: Passes data into the model.
📈 Retrieve Output: Generates insights using GPT.
📊 Data Storage with Astra DB
Schema Design:
👤 user_id: Unique identifier for the user.
🔖 post_type: Type of post (reel, carousel, static image).
❤️ likes, 💬 comments, 💪 shares: Engagement metrics.
🔄 Features
⏳ Real-Time Data Analysis: Analyze social media metrics on the fly.
🔄 Customizable Insights: Tailored insights generated using GPT.
📊 Scalable Storage: Efficient data management with Astra DB.
🌐 Workflow Automation: Seamless data orchestration with LangFlow.
