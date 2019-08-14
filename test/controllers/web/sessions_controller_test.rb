# frozen_string_literal: true
include Concerns::AuthHelper
require 'test_helper'

class Web::SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should get new' do
    get new_session_url
    assert_response :success
  end

<<<<<<< HEAD
  test "should post create" do
  	password = generate(:password)
  	user = create(:user, {password: password})
  	attrs = {
  		email: user.email,
  		password: password
  	}
  	post session_url, params: { session: attrs }
  	assert_response :redirect
=======
  test 'should post create' do
    password = generate(:string)
    user = create(:user, password: password)
    attrs = {
      email: user.email,
      password: password
    }
    post session_url, params: { session: attrs }
    assert_response :redirect
>>>>>>> fix lint
  end

  test 'should delete destroy' do
    delete session_url
    assert_response :redirect
  end
end
