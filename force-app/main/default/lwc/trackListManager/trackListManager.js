import { LightningElement } from 'lwc';

export default class TaskListManager extends LightningElement {
    showPending = true;

    tasks = [
        { id: '1', name: 'Design UI', status: 'Pending' },
        { id: '2', name: 'Write Apex', status: 'Completed' },
        { id: '3', name: 'Test Component', status: 'Pending' },
        { id: '4', name: 'Deploy to Sandbox', status: 'Pending' },
        { id: '5', name: 'Code Review', status: 'Completed' },
        { id: '6', name: 'Update Documentation', status: 'Pending' },
        { id: '7', name: 'Fix Bugs', status: 'Pending' }
    ];

    get filteredTasks() {
        return this.tasks.filter(task => 
            this.showPending ? task.status === 'Pending' : task.status === 'Completed'
        );
    }

    get toggleLabel() {
        return this.showPending ? 'Show Completed' : 'Show Pending';
    }

    handleToggle() {
        this.showPending = !this.showPending;
    }
}