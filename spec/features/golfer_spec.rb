require 'rails_helper'

describe 'Golfers' do

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

    def setuphole
        course = create(:course, name: 'course 1')
        hole = create(:hole, holeNumber: 1, course_id: 1)
    end

    specify 'Golfer can view map of a golf hole by selecting it' do
        createusers
        setuphole
        logingolfer
        click_link 'View'
        click_link 'show'
        click_link 'show'
        expect(page).to have_content 'Hole Viewer'
    end
    
end