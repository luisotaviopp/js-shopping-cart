<?php
	$servername = "sql200.main-hosting.eu";
	$username = "u234488260_taca_store";
	$password = "Abc123456@";
	$dbname = "u234488260_taca_store";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT name, size, model FROM product";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$emparray = array();

		while($row = mysqli_fetch_assoc($result))
		{
			$emparray[] = $row;
		}

	} else {
		echo "0 results";
	}

	echo json_encode($emparray);

	$conn->close();
?>