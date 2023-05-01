require 'rails_helper'

def signup()
    visit new_user_registration_path
    fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
    fill_in 'Password', with: 'Password123'
    fill_in 'Password confirmation', with: 'Password123'
    click_button 'Sign up'
end

def login()
    visit user_session_path
    fill_in 'Email', with: 'my.email.address@sheffield.ac.uk'
    fill_in 'Password', with: 'Password123'
    click_button 'Log in'
end

def createdriver()
    click_link 'New Club'
    select 'Driver', from: 'Club'
    click_button 'Save'
end

describe 'Managing User Info' do
    specify 'I can access my info' do
        signup()
        click_link 'My Info'
        expect(page).to have_content 'Listing Clubs'
    end

    specify 'I can add a new club' do
        signup()
        click_link 'My Info'
        createdriver()
        expect(page).to have_content 'Driver'
    end

    specify 'I can add club info whilst creating a club' do
        signup()
        click_link 'My Info'
        click_link 'New Club'
        select 'Driver', from: 'Club'
        fill_in 'Distance', with: '100'
        click_button 'Save'
        expect(page).to have_content '100.0'
    end

    specify 'I can edit a club to add info after it has been created' do
        signup()
        click_link 'My Info'
        click_link 'New Club'
        select 'Driver', from: 'Club'
        fill_in 'Distance', with: '100'
        click_button 'Save'
        click_link 'Edit'
        fill_in 'Rotation', with: '30.5'
        click_button 'Save'
        expect(page).to have_content '30.5'
    end

    specify 'I can edit a club to change info after it has been created' do
        signup()
        click_link 'My Info'
        createdriver()
        click_link 'Edit'
        select '9 Iron', from: 'Club'
        click_button 'Save'
        expect(page).to have_content '9 Iron'
    end

    specify 'My info saves when I log out and log back in' do
        signup()
        click_link 'My Info'
        createdriver()
        click_link 'Logout'
        login()
        click_link 'My Info'
        expect(page).to have_content 'Driver'
    end

    specify 'I can delete a club from my user info' do
        signup()
        click_link 'My Info'
        createdriver()
        click_link 'Delete'
        expect(page).to have_content 'Club was successfully deleted'
        expect(page).not_to have_content 'Driver'
    end

    specify 'I can see club info by clicking show on a club' do
        signup()
        click_link 'My Info'
        createdriver()
        click_link 'Show'
        expect(page).to have_content 'Club details'
        expect(page).to have_content 'Driver'
    end

    specify 'Number of clubs updates successfully when a club is created or deleted' do
        signup()
        click_link 'My Info'
        expect(page).to have_content 'You have 0 club(s)'
        createdriver()
        expect(page).to have_content 'You have 1 club(s)'
        click_link 'Delete'
        expect(page).to have_content 'You have 0 club(s)'
    end
end