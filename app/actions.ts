"use server"

export async function sendTenderEmail(formData: FormData) {
  const apiKey = "re_4JMegWZQ_2G8HtwJa1CAux4wnE1Sp8pgh"
  
  // Extract all the fields cleanly from the form submission
  const department = formData.get("department")
  const contactName = formData.get("contactName")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const sector = formData.get("sector")
  const projectType = formData.get("projectType")
  const budget = formData.get("budget")
  const refNo = formData.get("refNo") || "Not Provided"
  const location = formData.get("location")
  const scope = formData.get("scope")

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Mishra Infra Website <system@mishrainfra.in>",
        to: ["contact@mishrainfra.in"],
        subject: `🚨 New Tender Brief Received: ${department}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #333;">
            <h2 style="color: #c5a880; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Tender Submission Gateway Alert</h2>
            <p><strong>Department / Organization:</strong> ${department}</p>
            <p><strong>Contact Person:</strong> ${contactName}</p>
            <p><strong>Official Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>State / Location:</strong> ${location}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <p><strong>Sector:</strong> ${sector}</p>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Estimated Budget:</strong> ${budget}</p>
            <p><strong>Tender Reference No.:</strong> ${refNo}</p>
            <hr style="border: 0; border-top: 1px solid #eee;" />
            <h3 style="color: #666;">Scope & Requirements:</h3>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #c5a880; white-space: pre-wrap;">${scope}</div>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const errData = await res.json()
      console.error("Resend Processing Error:", errData)
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    console.error("Network / Server Action Exception:", error)
    return { success: false }
  }
}
