Branch for storing database. Please make sure to git push whenever you update it.
<br>
<br>
To dump the database:
1. Open cmd
2. Change the directory using cd (to your project directory)
3. Run this command: mysqldump -u root -p jobrapid > jobrapid.sql
4. Enter your password
5. Add the file using git add *jobrapid.sql
6. Change your branch to database (git branch database/git checkout database)
7. git push --set-upstream origin database/git push