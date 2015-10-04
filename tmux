#!/bin/sh 
APP_NAME='droppen'

tmux source-file .tmux.conf
tmux has-session -t '$APP_NAME' 
if [ $? != 0 ]
then 
  tmux new-session -s $APP_NAME -n vim -d
  tmux send-keys -t $APP_NAME C-m
  tmux send-key -t $APP_NAME 'vim' C-m
  tmux split-window -h -p 40 -t $APP_NAME
  tmux send-keys -t $APP_NAME:0.1 C-m

  tmux new-window -n puma -t $APP_NAME
  tmux send-keys -t $APP_NAME:1 C-m
  tmux send-keys -t $APP_NAME:1 'rake start' C-m

  tmux new-window -n ngrok -t $APP_NAME
  tmux send-keys -t $APP_NAME:2 'ngrok http 3000 --subdomain '$APP_NAME C-m

  tmux new-window -n bash -t $APP_NAME
  tmux send-keys -t $APP_NAME:3 C-m

#  tmux new-window -n sidekiq -t $APP_NAME
#  tmux send-keys -t $APP_NAME:4 C-m
#  tmux send-keys -t $APP_NAME:4 'redis-server' C-m
#  tmux split-window -h -t $APP_NAME
#  tmux send-keys -t $APP_NAME:4.1 C-m
#  tmux send-keys -t $APP_NAME:4.1 'sidekiq' C-m

  tmux select-window -t $APP_NAME:0
  tmux select-pane -t 0
fi
tmux attach -t $APP_NAME
