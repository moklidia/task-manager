require 'test_helper'

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    user = create(:user, :admin)
    get admin_user_url(user)
    assert_response :success
  end
end