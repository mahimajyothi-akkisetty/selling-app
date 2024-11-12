<?php
// Database connection
$conn = new mysqli('localhost', 'root', '', 'test');
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Sign-up form submission
    if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password']))
 {
        $fullname = $_POST['name'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Hash the password before storing it
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare the SQL query for sign-up
        $stmt = $conn->prepare("INSERT INTO signin (fullname, email, password) VALUES (?, ?, ?)");
        if ($stmt === false) 
	{
            die('Error preparing SQL query: ' . $conn->error);
        }
        
        // Bind the parameters
        $stmt->bind_param("sss", $fullname, $email, $password);
        
        // Execute the statement
        if ($stmt->execute()) 
	{
            echo "Sign-up successful!";
        } 
	else 
	{
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }

    // Login form submission
    else if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $q="select  *from signin where email='$email' and password='$password'";
         $r=mysqli_query($conn,$q);
     if(mysqli_num_rows($r)>0)
{
   header("Location: main.html");
  }
else 
echo "login failed";
 }      
$conn->close();
}
?>
