$(document).ready(function() {
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validateUserForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}

	// If valid------------------------
	var type = $("#hidUserIDSave").val() == "" ? "POST" : "PUT";
	$.ajax({
		url: "UsersAPI",
		type: type,
		data: $("#formUser").serialize(),
		dataType: "text",
		complete: function(response, status) {
			onUserSaveComplete(response.responseText, status);
		},
	});
});

function onUserSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidUserIDSave").val("");
	$("#formUser")[0].reset();
}

//UPDATE
$(document).on("click", ".btnUpdate", function(event) {
	$("#hidUserIDSave").val($(this).data("userid"));
	$("#firstName").val($(this).closest("tr").find("td:eq(0)").text());
	$("#lastName").val($(this).closest("tr").find("td:eq(1)").text());
	$("#NIC").val($(this).closest("tr").find("td:eq(2)").text());
	$("#address").val($(this).closest("tr").find("td:eq(3)").text());
	$("#phone").val($(this).closest("tr").find("td:eq(4)").text());
	$("#email").val($(this).closest("tr").find("td:eq(5)").text());
});

$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url: "UsersAPI",
		type: "DELETE",
		data: "userId=" + $(this).data("userid"),
		dataType: "text",
		complete: function(response, status) {
			onUserDeleteComplete(response.responseText, status);
		},
	});
});

function onUserDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

function validateUserForm() {

	if ($("#firstName").val().trim() == "") {
		return "Insert your first name.";
	}

	if ($("#lastName").val().trim() == "") {
		return "Insert your last name";
	}
	
	if ($("#NIC").val().trim() == "") {
		return "Insert NIC.";
	}

	if ($("#address").val().trim() == "") {
		return "Insert address.";
	}
	
	if ($("#phone").val().trim() == "") {
		return "Insert phone number.";
	}
	
	if ($("#email").val().trim() == "") {
		return "Insert your email address.";
	}
	return true;
}
