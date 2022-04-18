import {Selector} from 'testcafe';
import {ClientFunction} from 'testcafe';

const URL = 'http://localhost:9888';
fixture`Blogifier Test`
    .page`${URL}/admin/register`;

test('Blogifier Create admin test', async t => {

    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var string = '';
    for (var i = 0; i < 15; i++) {
        string += chars[Math.floor(Math.random() * chars.length)];
    }
    var email = string + '@gmail.com';
    // Generates a random "Gmail"

    // Saving selector constants.
    const registerEmail = Selector('#registerEmail');
    const registerName = Selector('#registerName');
    const registerPassword = Selector('#registerPassword');
    const registerConfirmPassword = Selector('#registerConfirmPassword');
    const registerButton = Selector('#createAdminAccountButton')

    // Registrate user.
    await t
        .typeText(registerEmail, email).expect(registerEmail.value).eql(email);
    await t
        .typeText(registerName, 'Thomas').expect(registerName.value).eql('Thomas');
    await t
        .typeText(registerPassword, 'helloWorld').expect(registerPassword.value).eql('helloWorld');
    await t
        .typeText(registerConfirmPassword, 'helloWorld').expect(registerConfirmPassword.value).eql('helloWorld');


    // Checking is passwords match.
    const confirmedPassword = await registerConfirmPassword.value;
    await t
        .expect(registerPassword.value).eql(confirmedPassword, 'Passwords has to match.');

    // Checking for fields not being empty.
    await t
        .expect(registerName.value).notEql('', 'Name has to be entered');
    await t
        .expect(registerEmail.value).notEql('', 'Email has to be entered');
    await t
        .expect(registerPassword.value).notEql('', 'Password has to be entered');
    await t
        .expect(registerConfirmPassword.value).notEql('', 'Confirm password has to be entered');

    // Clicking register button
    await t
        .click(registerButton);

    // Save location of page
    const getLocation = ClientFunction(() => document.location.href);
    // Check if page has changed to login
    await t
        .expect(getLocation()).contains(`${URL}/admin/login`);

    // await t
    //     .expect(ClientFunction(() => document.location.href)()).contains('http://localhost:5000/admin/login');


});