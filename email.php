<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['email'];


    $to = "contact@g7consultancy.in,shekars@g7consultancy.in";
    $subject = "Email enquiry from G7 website";
    $body = "Email: $email";

    $emailSent = mail($to, $subject, $body);

    if ($emailSent) {
        header("Location: index.html?emailSuccess=true");
    } else {
        header("Location: contact.html?emailSuccess=false");
    }
    exit;
}
?>