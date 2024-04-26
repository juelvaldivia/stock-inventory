package usersController

import (
	"net/http"

	"stock-inventory/api/responses"
	"stock-inventory/app/users"
)

func (controller *UsersController) GetUsers(response http.ResponseWriter, request *http.Request) {
	var database = controller.App.Database

	result, err := users.FindAll(database)

	if err != nil {
		responses.Json(response, http.StatusInternalServerError, err.Error())
		return
	}

	userMap := make(map[string]interface{})
	userMap["users"] = result

	responses.Json(response, http.StatusOK, userMap)
}
