require 'rails_helper'

describe 'Map creation' do

    def createusers
        user = create(:user, email: 'golfer@test.com', password: '123456', password_confirmation: '123456', map_creator: false)
        user = create(:user, email: 'creator@test.com', password: '123456', password_confirmation: '123456', map_creator: true)
    end

    def logingolfer
        visit user_session_path
        fill_in 'Email', with: 'golfer@test.com'
        fill_in 'Password', with: '123456'
        click_button 'Log in'
    end

    def logincreator
        visit user_session_path
        fill_in 'Email', with: 'creator@test.com'
        fill_in 'Password', with: '123456'
        click_button 'Log in'
    end

    specify 'Map creator can create a course but other users can not' do
        createusers
        logincreator
        click_link 'View'
        click_link 'New Course'
        fill_in 'Name', with: 'course 1'
        click_button 'Save'
        expect(page).to have_content 'Course was successfuly created'
        expect(page).to have_content 'course 1'

        logout

        visit user_session_path
        fill_in 'Email', with: 'golfer@test.com'
        fill_in 'Password', with: '123456'
        click_button 'Log in'
        click_link 'View'
        expect(page).not_to have_content 'New Course'
    end

    specify 'Map creator can delete a course but other useres can not' do
        createusers
        logincreator
        click_link 'View'
        click_link 'New Course'
        fill_in 'Name', with: 'course 1'
        click_button 'Save'
        click_link 'Destroy'
        expect(page).to have_content 'Course was successfully destroyed'
        expect(page).not_to have_content 'course 1'
        click_link 'New Course'
        fill_in 'Name', with: 'course 2'
        click_button 'Save'

        logout

        logingolfer
        click_link 'View'
        expect(page).to have_content 'course 2'
        expect(page).not_to have_content 'Destroy'
    end

    specfiy 'Map creator can create a hole but other users can not' do
        createusers
        logincreator
        click_link 'View'
        click_link 'New Course'
        fill_in 'Name', with: 'course 1'
        click_button 'Save'
        click_link 'show'
        click_link 'New Hole'
        fill_in 'Holenumber', with: 'Hole 1'
        click_button 'Save'
        expect(page).to have_content 'Hole was successfuly created'

        logout

        visit user_session_path
        logingolfer
        click_link 'View'
        click_link 'show'
        expect(page).not_to have_content 'New Hole'

    end

    #specify 'Map creator can delete a hole but other users can not' do
        

    #end
end
