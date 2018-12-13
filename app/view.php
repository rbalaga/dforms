<?php
    // print_r($_REQUEST['FORM']);
    if (isset($_POST['FORM'])) {
        $formData = $_POST['FORM'];
        echo $formData['FormTitle'];
    }else {
        echo 'invalid request';
    }

?>