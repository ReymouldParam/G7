<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect data from form
    $name = $_POST['name'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    // Recipient email
    $to = "contact@g7consultancy.in, shekars@g7consultancy.in";
    // Email subject and body
    $subject = "New enquiry from G7 website";
    $body = "Name: $name\n"
        . "Company: $company\n"
        . "Email: $email\n"
        . "Phone: $phone\n"
        . "Service Interested: $service\n"
        . "Message:\n$message";

    // Send the email
    $emailSent = mail($to, $subject, $body);

    // Redirect based on result
    if ($emailSent) {
        header("Location: contact.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>