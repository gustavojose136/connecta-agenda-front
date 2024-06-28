import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { calendarEvents, category, createEventId } from './data';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CalendarOptions, EventApi, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import Swal from 'sweetalert2';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { ScheduleFilter } from 'src/app/core/models/filter/scheduleFilter.model';
import { OrderAddModel } from 'src/app/core/models/Add/ScheduleAdd.Model';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserProfileService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  modalRef?: BsModalRef;

  // bread crumb items
  breadCrumbItems: Array<{}>;

  @ViewChild('modalShow') modalShow: TemplateRef<any>;
  @ViewChild('editmodalShow') editmodalShow: TemplateRef<any>;

  shedules: any;

  users: any;

  formEditData: UntypedFormGroup;
  submitted = false;
  category: any[];
  newEventDate: any;
  editEvent: any;
  calendarEvents: any;
  // event form
  formData: UntypedFormGroup;

  currentEvents: EventApi[] = [];

  calendarOptions: CalendarOptions;

  constructor(
    private modalService: BsModalService,
    private scheduleService: ScheduleService,
    private formBuilder: UntypedFormBuilder,
    private spinner: NgxSpinnerService,
    private userService: UserProfileService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Agenda' }, { label: 'Calendário', active: true }];

    this.formData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      ProfissionalServiceId: ['', [Validators.required]],
      ClientId: ['', [Validators.required]],
      Observation: [''],
      Status: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: [''],
      paymentMethod: ['', [Validators.required]],
      PlanCardId: [''],
      Price: ['', [Validators.required]],
      Discont: [''],
      IsPaid: [false],
      IsPlanCoop: [false],
      PricePlanCoop: ['']
    });

    this.formEditData = this.formBuilder.group({
      editTitle: ['', [Validators.required]],
      editCategory: ['', [Validators.required]],
      ProfissionalServiceId: ['', [Validators.required]],
      ClientId: ['', [Validators.required]],
      Observation: [''],
      Status: ['', [Validators.required]],
      StartDate: ['', [Validators.required]],
      EndDate: [''],
      paymentMethod: ['', [Validators.required]],
      PlanCardId: [''],
      Price: ['', [Validators.required]],
      Discont: [''],
      IsPaid: [false],
      IsPlanCoop: [false],
      PricePlanCoop: ['']
    });

    this.getSchedules();
    this.getAllUsers();
  }

  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo)
    this.editEvent = clickInfo.event;
    var category = clickInfo.event.classNames;
    this.formEditData.patchValue({
      editTitle: clickInfo.event.title,
      editCategory: category instanceof Array ? clickInfo.event.classNames[0] : clickInfo.event.classNames,
      ProfissionalServiceId: clickInfo.event.extendedProps.ProfissionalServiceId,
      ClientId: clickInfo.event.extendedProps.ClientId,
      Observation: clickInfo.event.extendedProps.Observation,
      Status: clickInfo.event.extendedProps.Status,
      StartDate: clickInfo.event.start,
      EndDate: clickInfo.event.end,
      paymentMethod: clickInfo.event.extendedProps.paymentMethod,
      PlanCardId: clickInfo.event.extendedProps.PlanCardId,
      Price: clickInfo.event.extendedProps.Price,
      Discont: clickInfo.event.extendedProps.Discont,
      IsPaid: clickInfo.event.extendedProps.IsPaid,
      IsPlanCoop: clickInfo.event.extendedProps.IsPlanCoop,
      PricePlanCoop: clickInfo.event.extendedProps.PricePlanCoop
    });
    this.modalRef = this.modalService.show(this.editmodalShow);
  }

  /**
   * Events bind in calendar
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  get form() {
    return this.formData.controls;
  }

  /**
   * Delete-confirm
   */
  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    });
  }

  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /**
   * Event add modal
   */
  openModal(event?: any) {
    this.newEventDate = event;
    this.modalRef = this.modalService.show(this.modalShow);
  }

  /**
   * save edit event data
  //  */
  // editEventSave() {
  //   const eventData = this.formEditData.value;
  //   const editId = this.calendarEvents.findIndex(
  //     (x) => x.id + '' === this.editEvent.id + ''
  //   );

  //   this.editEvent.setProp('title', eventData.editTitle);
  //   this.editEvent.setProp('classNames', eventData.editCategory);
  //   this.editEvent.setExtendedProp('ProfissionalServiceId', eventData.ProfissionalServiceId);
  //   this.editEvent.setExtendedProp('ClientId', eventData.ClientId);
  //   this.editEvent.setExtendedProp('Observation', eventData.Observation);
  //   this.editEvent.setExtendedProp('Status', eventData.Status);
  //   this.editEvent.setStart(eventData.StartDate);
  //   this.editEvent.setEnd(eventData.EndDate);
  //   this.editEvent.setExtendedProp('paymentMethod', eventData.paymentMethod);
  //   this.editEvent.setExtendedProp('PlanCardId', eventData.PlanCardId);
  //   this.editEvent.setExtendedProp('Price', eventData.Price);
  //   this.editEvent.setExtendedProp('Discont', eventData.Discont);
  //   this.editEvent.setExtendedProp('IsPaid', eventData.IsPaid);
  //   this.editEvent.setExtendedProp('IsPlanCoop', eventData.IsPlanCoop);
  //   this.editEvent.setExtendedProp('PricePlanCoop', eventData.PricePlanCoop);

  //   this.calendarEvents[editId] = {
  //     ...this.editEvent,
  //     title: eventData.editTitle,
  //     id: this.editEvent.id,
  //     classNames: eventData.editCategory + ' ' + 'text-white',
  //   };

  //   this.position();
  //   this.formEditData.reset();
  //   this.modalService.hide();
  // }

  /**
   * Delete event
   */
  deleteEventData() {
    this.editEvent.remove();
    this.modalService.hide();
  }

  /**
   * Close event modal
   */
  closeEventModal() {
    this.formData.reset();
    this.modalService.hide();
  }

  /**
   * Save the event
   */
  saveEvent() {
    if (this.formData.valid) {
      const newEvent: OrderAddModel = {
        profissionalServiceId: this.formData.get('ProfissionalServiceId').value,
        clientId: this.formData.get('ClientId').value,
        observation: this.formData.get('Observation').value,
        status: this.formData.get('Status').value,
        startDate: new Date(this.formData.get('StartDate').value),
        endDate: new Date(this.formData.get('EndDate').value),
        paymentMethod: this.formData.get('paymentMethod').value,
        planCardId: this.formData.get('PlanCardId').value == "" ? null : this.formData.get('PlanCardId').value,
        price: this.formData.get('Price').value,
        discont: this.formData.get('Discont').value == "" ? 0 : this.formData.get('Discont').value,
        isPaid: this.formData.get('IsPaid').value,
        isPlanCoop: this.formData.get('IsPlanCoop').value,
        pricePlanCoop: this.formData.get('PricePlanCoop').value,
      };

      this.scheduleService.add(newEvent).subscribe((response) => {
        this.getSchedules();
        this.position();
        this.formData.reset();
        this.modalService.hide();
      });
    }
    this.submitted = true;
  }

  editEventSave() {
    // const editEvent: OrderAddModel = {
    //   ProfissionalServiceId: this.formEditData.get('ProfissionalServiceId').value,
    //   ClientId: this.formEditData.get('ClientId').value,
    //   Observation: this.formEditData.get('Observation').value,
    //   Status: this.formEditData.get('Status').value,
    //   StartDate: new Date(this.formEditData.get('StartDate').value),
    //   EndDate: new Date(this.formEditData.get('EndDate').value),
    //   paymentMethod: this.formEditData.get('paymentMethod').value,
    //   PlanCardId: this.formEditData.get('PlanCardId').value,
    //   Price: this.formEditData.get('Price').value,
    //   Discont: this.formEditData.get('Discont').value,
    //   IsPaid: this.formEditData.get('IsPaid').value,
    //   IsPlanCoop: this.formEditData.get('IsPlanCoop').value,
    //   PricePlanCoop: this.formEditData.get('PricePlanCoop').value,
    // };

    // this.scheduleService.updateEvent(this.editEvent.id, editEvent).subscribe((response) => {
    //   this.getSchedules();
    //   this.position();
    //   this.formEditData.reset();
    //   this.modalService.hide();
    // });
  }


  /**
   * Fetches the data
   */
  private _fetchData() {
    // Event category
    this.category = category;
    // Calendar Event Data
    this.calendarEvents = this.shedules;
    // form submit
    this.submitted = false;
    this.updateCalendarOptions();
    this.spinner.hide();
  }

  updateCalendarOptions() {
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        center: 'title',
        right: 'prevYear,prev,next,nextYear'
      },
      initialView: "timeGridWeek",
      themeSystem: "bootstrap",
      initialEvents: this.calendarEvents,
      weekends: true,
      editable: true,
      selectable: true,
      nowIndicator: true,
      selectMirror: true,
      dayMaxEvents: true,
      locale: 'pt-br',
      dateClick: this.openModal.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
        hour12: true
      }
    };
  }

  getSchedules() {
    this.spinner.show();
    this.scheduleService.get(new ScheduleFilter()).subscribe((data) => {
      console.log(data);
      this.shedules = data;
      this._fetchData();
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(data);
    });
  }
}
