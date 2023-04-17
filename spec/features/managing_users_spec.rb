require 'rails_helper'

describe 'Managing users' do
    specify 'I can register a user' do
        # Sign up
        visit new_user_registration_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password123'
        fill_in 'Password confirmation', with: 'Password123'
        click_button 'Sign up'
        expect(page).to have_content 'Welcome! You have signed up successfully.'

        logout

        #Log in
        visit user_session_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password123'
        click_button 'Log in'
        expect(page).to have_content 'Signed in successfully.'
    end

    specify 'I can not sign up with password less than 6 characters minimum' do
        visit new_user_registration_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: '123'
        fill_in 'Password confirmation', with: '123'
        click_button 'Sign up'
        expect(page).to have_content 'Password is too short (minimum is 6 characters)'
    end

    specify 'I can not sign up with email already be registered' do
        visit new_user_registration_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password123'
        fill_in 'Password confirmation', with: 'Password123'
        click_button 'Sign up'

        logout

        visit new_user_registration_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password123'
        fill_in 'Password confirmation', with: 'Password123'
        click_button 'Sign up'
        expect(page).to have_content 'Email has already been taken'
    end

    specify 'I can not sign up when password and password confirmation are different' do
        visit new_user_registration_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password123'
        fill_in 'Password confirmation', with: 'Password1234'
        click_button 'Sign up'
        expect(page).to have_content "Password confirmation doesn't match Password"
    end

    specify 'I can not login without sign up.' do
        visit user_session_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password123'
        click_button 'Log in'
        expect(page).to have_content 'Invalid Email or password.'
    end

    specify 'I can not login with incorrect email or password' do
        visit new_user_registration_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password123'
        fill_in 'Password confirmation', with: 'Password123'
        click_button 'Sign up'

        logout

        visit user_session_path
        fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password'
        click_button 'Log in'
        expect(page).to have_content 'Invalid Email or password.'

        fill_in 'Email', with: 'y.email.address@sheffield.ac.uk'
        fill_in 'Password', with: 'Password123'
        expect(page).to have_content 'Invalid Email or password.'
    end
end