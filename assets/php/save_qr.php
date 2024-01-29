<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $serialCode = $_POST['serialCode'];
    $dataURL = $_POST['dataURL'];

    // Convert data URL to binary data
    $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $dataURL));

    // Save the binary data to a file
    file_put_contents('assets/qr/' . $serialCode . '.png', $data);

    echo 'QR code saved successfully';
} else {
    echo 'Invalid request';
}
?>
