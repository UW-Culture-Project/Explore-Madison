# Team Contribution Guidelines

To successfully collaborate on this project, we will follow a guideline on how to manage and resolve code conflicts.

In order to safely and easily manage our code, we will each work in our own development branches. The development branches will all be branched off of `master` branch. When working on your own feature, do all work in your own development branch. Periodically throuought the process of working on your branch, it is a good idea to merge `master` back into your branch to keep it up to date with most recent changes. 

To do this, you will run the command `git pull` and then the command `git merge master` while in your development branch. This will merge all the recent changes to `master` into your development branch. [Go here to learn more about `git merge`](https://git-scm.com/docs/git-merge).

When you are done developing your feature, you must first push your work to the remote branch by `git push` and then in the GitHub interface, submit a pull request from your development branch into `master`. Then assign everyone on the team as reviewers. This will allow everyone to review the changes before they go into `master` to make sure they make sense and are bug-free.

Feel free to ask any questions about these guidelines or any changes you'd like to make.