const layOut = require("./emailLayout");

const emailVerificationTemplate = ({ name, verificationURL }) =>
  layOut({
    title: "Verify your email",
    subtitle: "One final step before you get started with Invoice Pro.",
    body: `
        <p style="
            margin:0 0 18px;
            font-size:15px;
            line-height:1.7;
            color:#333333;
        ">
            Hello <strong style="color:#000000;">${name}</strong>,
        </p>

        <p style="
            margin:0 0 24px;
            font-size:15px;
            line-height:1.7;
            color:#333333;
        ">
            Thank you for creating your Invoice Pro account. 
            Please verify your email address to complete your registration
            and keep your account secure.
        </p>

        <!-- VERIFICATION NOTICE -->

        <div style="
            margin:28px 0;
            padding:18px 20px;
            background:#f7f3f9;
            border:1px solid #e7deeb;
            border-radius:8px;
        ">
            <p style="
            margin:0;
            font-size:14px;
            line-height:1.7;
            color:#333333;
            ">
            This verification link will expire in
            <strong style="color:#000000;">24 hours</strong>.
            </p>
        </div>

        <!-- BUTTON -->

        <div style="
            margin:32px 0;
            text-align:left;
        ">
            <a
            href="${verificationURL}"
            style="
                display:inline-block;
                padding:13px 24px;
                background:#1f0637;
                color:#ffffff;
                text-decoration:none;
                border-radius:999px;
                font-size:14px;
                font-weight:600;
            "
            >
            Verify email address
            </a>
        </div>

        <!-- FALLBACK LINK -->

        <p style="
            margin:0 0 10px;
            font-size:14px;
            line-height:1.7;
            color:#666666;
        ">
            If the button doesn't work, copy and paste this link into your browser:
        </p>

        <div style="
            padding:13px 15px;
            background:#fafafa;
            border:1px solid #e8e8e8;
            border-radius:7px;
            word-break:break-all;
        ">
            <a
            href="${verificationURL}"
            style="
                color:#1f0637;
                font-size:13px;
                line-height:1.6;
                border-radius:999px;
                text-decoration:none;
            "
            >
            ${verificationURL}
            </a>
        </div>

        <!-- SECURITY MESSAGE -->

        <p style="
            margin:26px 0 0;
            font-size:14px;
            line-height:1.7;
            color:#666666;
        ">
            If you didn't create a Invoice Pro account, you can safely ignore
            this email. No further action is required.
        </p>

        <p style="
            margin:28px 0 0;
            font-size:14px;
            line-height:1.7;
            color:#333333;
        ">
            Thanks,<br>
            <strong style="color:#000000;">The Invoice Pro Team</strong>
        </p>
    `,
});

export default emailVerificationTemplate;
