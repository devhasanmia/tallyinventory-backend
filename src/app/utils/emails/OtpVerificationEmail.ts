export const OtpVerificationEmail = (name: string, otp: string) => {
    return `<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP যাচাইকরণ</title>
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
            background: linear-gradient(135deg, #059669, #10b981);
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

        .otp-box {
            font-size: 32px;
            font-weight: bold;
            background-color: #ecfdf5;
            color: #065f46;
            padding: 20px;
            text-align: center;
            letter-spacing: 4px;
            border-radius: 8px;
            margin: 30px 0;
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
        <div class="header">OTP যাচাইকরণ প্রয়োজন</div>
        <!-- Content -->
        <div class="content">
            <p><strong>প্রিয় <span style="color: #10b981;">${name}</span>,</strong></p>
            <p>আপনার লগইন বা প্রোফাইল নিরাপত্তার জন্য নিচের OTP কোডটি ব্যবহার করুন:</p>
            <div class="otp-box">${otp}</div>
            <p>এই OTP কোডটির মেয়াদ ৫ মিনিট। দয়া করে যত দ্রুত সম্ভব এটি ব্যবহার করুন।</p>
        </div>
        <!-- Footer -->
        <div class="footer">
            <p>&copy; ২০২৫ টালি ইনভেন্টরি. সর্বস্বত্ব সংরক্ষিত।</p>
            <p>ঠিকানাঃ গ্রাম/রাস্তাঃ চন্দ্রপুর, তুলাধুনা বাজার, গুরুদাসপুর, নাটোর।</p>
        </div>
    </div>
</body>
</html>`;
};
