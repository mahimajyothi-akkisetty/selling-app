<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'test');
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Sign-up form submission
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])) {
        $fullname = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Hash the password before storing it
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare the SQL query for sign-up
        $stmt = $conn->prepare("select *from signin where email='$email' and password='$password'");
        if ($stmt === false) {
            die('Error preparing SQL query: ' . $conn->error);
        }
        
        // Bind the parameters
        $stmt->bind_param("sss", $fullname, $email, $hashed_password);
        
        // Execute the statement
$r=$stmt->execute() 
        if () {
            echo "Login successful!";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }

    // Login form submission
    elseif (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Check if the user exists
        $stmt = $conn->prepare("SELECT  email,password FROM signin WHERE email = ?");
        if ($stmt === false) {
            die('Error preparing SQL query: ' . $conn->error);
        }

        // Bind the email parameter
        $stmt->bind_param("s", $email);

        // Execute the query
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows > 0) {
            // Fetch the stored password hash and user details
            $stmt->bind_result($email, $stored_password);
            $stmt->fetch();
            
            // Verify the entered password against the stored hash
            if (password_verify($password, $stored_password)) {
                // Password is correct, proceed to login
                echo "Login successful!";
                
                // Start session and store user info in session
                session_start();
                $_SESSION['email'] = $email;
                $_SESSION['password'] = $stored_password;
                
                // Redirect to the dashboard or a protected page
                header("Location: dashboard.php");
                exit();
            } else {
                // Invalid password
                echo "Invalid password.";
            }
        } else {
            // No account found with this email
            echo "No account found with this email.";
        }

        // Close the statement
        $stmt->close();
    }
}

// Close the database connection
$conn->close();
?>
