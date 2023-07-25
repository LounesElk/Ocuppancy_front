<!DOCTYPE html>
<html>
<head>
	<title>Formulaire de contact</title>
	<style>
		body {
			background-color: #f8f8f8;
			font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
			font-size: 14px;
			line-height: 1.6;
			margin: 0;
			padding: 0;
		}
		form {
			background-color: #f8f8f8;
			margin: 0 auto;
			max-width: 500px;
			padding: 20px;
			text-align: center;
		}
		h1 {
			font-size: 36px;
			font-weight: bold;
			margin-top: 0;
		}
		label {
			color: #444;
			display: block;
			font-size: 16px;
			font-weight: bold;
			margin-bottom: 5px;
			text-align: left;
		}
		input[type="text"],
		input[type="email"],
		textarea {
			border: none;
			border-radius: 5px;
			box-shadow: inset 0 0 0 1px #d9d9d9;
			font-size: 16px;
			margin: 0 0 20px;
			padding: 10px;
			width: 100%;
		}
		textarea {
			height: 150px;
			resize: none;
		}
		input[type="submit"] {
			background-color: #000;
			border: none;
			border-radius: 5px;
			color: #fff;
			cursor: pointer;
			font-size: 16px;
			padding: 10px 15px;
			transition: all 0.3s ease;
		}
		input[type="submit"]:hover {
			background-color: #333;
			transition: all 0.3s ease;
		}
	</style>
</head>
<body>
	<form>
		<h1>Contactez-nous</h1>
		<label for="name">Nom</label>
		<input type="text" id="name" name="name" placeholder="Votre nom" required>
		<label for="email">Email</label>
		<input type="email" id="email" name="email" placeholder="Votre email" required>
		<label for="message">Message</label>
		<textarea id="message" name="message" placeholder="Votre message" required></textarea>
		<input type="submit" value="Envoyer">
	</form>
</body>
</html>