import { Controller } from "@hotwired/stimulus";
import Sortable from "sortablejs";

export default class extends Controller {
  connect() {
    console.log(true);

    this.initSortableColumns();
    this.initSortableTasks();
  }

  initSortableColumns() {
    const columns = this.element.querySelector(".columns");
    Sortable.create(columns, {
      animation: 150,
      onEnd: (event) => {
        const newIndex = event.newIndex;
        const columnId = event.item.dataset.columnId;

        // Send a request to update the column order
        this.updateColumnOrder(columnId, newIndex);
      },
    });
  }

  initSortableTasks() {
    const columns = this.element.querySelectorAll(".column");
    columns.forEach((column) => {
      const tasksContainer = column.querySelector(".tasks");
      Sortable.create(tasksContainer, {
        group: "tasks",
        animation: 150,
        onEnd: (event) => {
          const taskId = event.item.dataset.taskId;
          const newColumnId = event.from.closest(".column").dataset.columnId;
          const newPosition = event.newIndex;

          // Send a request to update the task's column and position
          this.updateTaskOrder(taskId, newColumnId, newPosition);
        },
      });
    });
  }

  updateColumnOrder(columnId, newIndex) {
    fetch(`/columns/${columnId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
      },
      body: JSON.stringify({ column: { position: newIndex } }),
    });
  }

  updateTaskOrder(taskId, newColumnId, newPosition) {
    fetch(`/columns/${newColumnId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector("[name='csrf-token']").content,
      },
      body: JSON.stringify({ task: { position: newPosition, column_id: newColumnId } }),
    });
  }
}