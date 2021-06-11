import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TodoService } from 'src/app/services/todo.service';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList = [];

  today: number = Date.now();

  constructor(
    public modalCtrl: ModalController,
    public todoService: TodoService
  ) {
    this.getAllTask();
  }

  async addTask() {
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage,
    });

    modal.onDidDismiss().then((newTask) => {
      this.getAllTask();
    });

    return await modal.present();
  }

  getAllTask() {
    this.todoList = this.todoService.getAllTasks();
    console.log(this.todoService.getAllTasks());
  }

  delete(key) {
    //console.log(key);
    this.todoService.deleteTask(key);
    this.getAllTask();

    //this.todoList.splice(index, 1);
  }

  async update(selectedTask) {
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: { task: selectedTask },
    });

    modal.onDidDismiss().then(() => {
      this.getAllTask();
    });

    return await modal.present();
  }
}
