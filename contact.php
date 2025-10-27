<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Sanitize & validate form data
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $company = htmlspecialchars(trim($_POST['company'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $service = htmlspecialchars(trim($_POST['service'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        header("Location: contact.html?emailSuccess=false&error=missing_fields");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        header("Location: contact.html?emailSuccess=false&error=invalid_email");
        exit;
    }

    // Email setup
    $to = "shekar.sanda@shekarandco.com";
    $subject = "New enquiry from G7 website";
    $body = "
        <h2>New Contact Enquiry</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Company:</strong> {$company}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Service:</strong> {$service}</p>
        <p><strong>Message:</strong><br>{$message}</p>
    ";

    // Send email
    $emailSent = mail($to, $subject, $body, $headers);

    // Redirect based on result
    if ($emailSent) {
        header("Location: contact.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>