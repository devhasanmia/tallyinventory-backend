export const RegistrationEmail = (name: string, designation: string) => {
    return `<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ব্যবসায়িক প্রোফাইল তৈরি সম্পন্ন</title>
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f8fafc;
            color: #333333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 650px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #4f46e5, #6366f1);
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }

        .content {
            padding: 30px;
            color: #374151;
        }

        .content p {
            margin: 0 0 16px;
        }

        .button-container {
            text-align: center;
            margin: 30px 0;
        }

        .button {
            background-color: #6366f1;
            color: #ffffff;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(99, 102, 241, 0.4);
        }

        .footer {
            font-size: 14px;
            color: #6b7280;
            text-align: center;
            padding: 20px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">অভিনন্দন!</div>
        <!-- Content -->
        <div class="content">
            <p><strong>আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়াবারকাতুহু,</strong></p>
            <p>প্রিয় <strong style="color: #2563eb;">${name}</strong>,</p>
            <p>আপনার একটি ${designation} প্রোফাইল সফলভাবে তৈরি হয়েছে!</p>
            <p>এখন আপনার ব্যবসা পরিচালনা করার জন্য প্রস্তুত।</p>
            <div class="button-container">
                <a href="#" class="button"><b style="color:white">লগইন করুন</b></a>
            </div>
            <p>যদি কোনো প্রশ্ন থাকে বা সহায়তার প্রয়োজন হয়, অনুগ্রহ করে আমাদের <a href="#" style="color: #6366f1;">সাপোর্ট টিমের সাথে যোগাযোগ করুন</a>।</p>
        </div>
        <!-- Footer -->
        <div class="footer">
            <p>&copy; ২০২৫ টালি ইনভেন্টরি. সর্বস্বত্ব সংরক্ষিত।</p>
            <p>ঠিকানাঃ গ্রাম/রাস্তাঃ চন্দ্রপুর, তুলাধুনা বাজার, গুরুদাসপুর, নাটোর।</p>
        </div>
    </div>
</body>
</html>
`
}