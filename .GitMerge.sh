#!/bin/sh
# Repo: jsbookie-backend

# To run the commands enter into shell:
# sh .PushMergeDeletePrune.sh

# Many "$VARIABLE" are secrets stored in Replit projects. 

# Git Config Commands
git config --global user.email $github_email
git config --global user.name $github_username

# Push changes to Git
git push origin $github_working_branch # NAME_OF_BRANCH

# Commit changes to git
git commit -a -m $commit_message # 'MESSAGE'

# Push changes to Git
git push origin $github_working_branch # NAME_OF_BRANCH

# Merge into main:
git checkout main
git merge $github_working_branch # NAME_OF_BRANCH
git push

# Choose one
  # Return to the working branch
  git checkout $github_working_branch
 
  # Delete the working branch
  # git branch --delete $github_working_branch # NAME_OF_BRANCH

# Optional: Prune outstanding branches
  # git remote prune origin
  # git prune

# To Remove local branches:
# 