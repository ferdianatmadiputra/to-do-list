const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:'apptodolist365@gmail.com',
        pass: 'hacktiv8'
    }
});
function nodemailtodo (email){
let mailOptions =
{
    from: 'apptodolist365@gmail.com',
    to: email,
    subject: 'Welcome to ToDoList App',
    text: `
    Welcome TO TODOLIST APP, start organizing your project with us!
    The Key to Efficiency
    Do you often feel overwhelmed by the amount of work you have to do? Do you find yourself missing deadlines? Or do you sometimes just forget to do something important, so that people have to chase you to get work done?
    
    All of these are symptoms of not keeping a proper "To-Do List." These are prioritized lists of all the tasks that you need to carry out. They list everything that you have to do, with the most important tasks at the top of the list, and the least important tasks at the bottom.
    
    By keeping such a list, you make sure that your tasks are written down all in one place so you don't forget anything important. And by prioritizing tasks, you plan the order in which you'll do them, so that you can tell what needs your immediate attention, and what you can leave until later.
    
    To-Do Lists are essential if you're going to beat work overload. When you don't use them effectively, you'll appear unfocused and unreliable to the people around you.
    
    When you do use them effectively, you'll be much better organized, and you'll be much more reliable. You'll experience less stress, safe in the knowledge that you haven't forgotten anything important. More than this, if you prioritize intelligently, you'll focus your time and energy on high-value activities, which will mean that you're more productive, and more valuable to your team.
    
    Keeping a properly structured and thought-out list sounds simple enough. But it can be surprising how many people fail to use them at all, never mind use them effectively.
    
    In fact, it's often when people start to use them effectively and sensibly that they make their first personal productivity breakthroughs, and start making a success of their careers. The video, below, gives some tips on how you can start to use To-Do Lists more effectively.`
    }

return transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    console.log('Email sent: ' + info.response);
    });
}
module.exports= nodemailtodo;
