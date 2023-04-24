<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chatroomdb";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}
?>
<?php
$sql = "SELECT * FROM messages";
$result = $conn->query($sql);
$messages = $result->fetchAll(PDO::FETCH_ASSOC);
?>
<?php foreach ($messages as $message) { ?>
  <div>
    <p><?php echo $message['content']; ?></p>
  </div>
<?php } ?>