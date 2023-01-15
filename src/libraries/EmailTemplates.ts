export default class EmailTemplates {
  protected companyName: string;
  protected recieverInfo: string;
  protected message: string;
  protected subject: string;
  protected links: string;
  protected ticketCode: string;
  protected description: string;
  protected priority: string;
  protected agent: string;

  constructor(
    companyName: string = '',
    personName: string,
    message: string,
    subject: string,
    links: string = '',
    ticketCode: string = '',
    description: string = '',
    priority: string = '',
    agent: string = '',
  ) {
    this.companyName = companyName;
    this.recieverInfo = personName;
    this.message = message;
    this.subject = subject;
    this.links = links;
    this.ticketCode = ticketCode;
    this.description = description;
    this.priority = priority;
    this.agent = agent;
  }

  public WelcomeMailTemplate() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Welcome ${this.recieverInfo} to ${this.companyName} Help Desk System</h1>.
    <br/>
    <span style="font-size:15px">For activating account please click on link below :</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${this.links}" target="_blank">Activate Account</a>
    `;
    return trmplate;
  }

  public ResetPasswordTemplate() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    This message from ${this.recieverInfo} to ${this.companyName} Help Desk System</h1>.
    <br/>
    <span style="font-size:15px">For reset password, Please click on link below :</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${this.links}" target="_blank">Reset Password</a>
    `;
    return trmplate;
  }

  public WelcomeMailTemplateWithoutActivationLink() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Welcome ${this.recieverInfo} to ${this.companyName} Help Desk System</h1>.
    <br/>
    <span style="font-size:15px">Your account was successfully created and activated.</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${this.links}" target="_blank">Visit Site</a>
    `;
    return trmplate;
  }

  public SendMessageToTicketsManagerWhenRegisteredTicket() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Hello ${this.recieverInfo}, You have one new ticket from client ${
      this.companyName
    }</h1>
    <br/>
    <span style="font-size:15px">Ticket Code : ${
      this.ticketCode
    }.</span><br/><br/>
    <span style="font-size:15px">Ticket Information : ${
      this.description
    }.</span><br/><br/>
    <span style="font-size:15px;${
      this.priority.toLowerCase().indexOf('critical') != -1 ||
      this.priority.toLowerCase().indexOf('high') != -1
        ? 'background-color:#c9161c;color:white;padding:10px;border-radius:5px'
        : 'background-color:#3045cf;color:white;padding:10px;border-radius:5px'
    }">Ticket Priortity : ${this.priority}</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${
      process.env.NODE_ENV === 'Production'
        ? process.env.APP_URL_PROD
        : process.env.APP_URL_DEV
    }${this.links}" target="_blank">See Ticket</a>
    `;
    return trmplate;
  }

  public SendMessageToTicketsAgent() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Hello ${this.recieverInfo}, You have one new ticket</h1>
    <br/>
    <span style="font-size:15px">Ticket Code : ${
      this.ticketCode
    }.</span><br/><br/>
    <span style="font-size:15px">Ticket Information : ${
      this.description
    }.</span><br/><br/>
    <span style="font-size:15px;${
      this.priority.toLowerCase().indexOf('critical') != -1 ||
      this.priority.toLowerCase().indexOf('high') != -1
        ? 'background-color:#c9161c;color:white;padding:10px;border-radius:5px'
        : 'background-color:#3045cf;color:white;padding:10px;border-radius:5px'
    }">Ticket Priortity : ${this.priority}</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${
      process.env.NODE_ENV === 'Production'
        ? process.env.APP_URL_PROD
        : process.env.APP_URL_DEV
    }${this.links}" target="_blank">See Ticket</a>
    `;
    return trmplate;
  }

  public doneTicketByAgent() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Hello ${this.recieverInfo}, Ticket with Code :${
      this.ticketCode
    } is done by agent.</h1>
    <br/>
    <span style="font-size:15px">Ticket Code : ${
      this.ticketCode
    }.</span><br/><br/>
    <span style="font-size:15px">Ticket Information : ${
      this.description
    }.</span><br/><br/>
    <span style="font-size:15px;${
      this.priority.toLowerCase().indexOf('critical') != -1 ||
      this.priority.toLowerCase().indexOf('high') != -1
        ? 'background-color:#c9161c;color:white;padding:10px;border-radius:5px'
        : 'background-color:#3045cf;color:white;padding:10px;border-radius:5px'
    }">Ticket Priortity : ${this.priority}</span><br/><br/>
    <span>Agent : ${this.agent}</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${
      process.env.NODE_ENV === 'Production'
        ? process.env.APP_URL_PROD
        : process.env.APP_URL_DEV
    }${this.links}" target="_blank">See Ticket</a>
    `;
    return trmplate;
  }

  public rejectTicketByAdmin() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Hello ${this.recieverInfo}, Ticket : ${this.subject} with Code : ${
      this.ticketCode
    } was rejected.</h1>
    <br/>
    <span style="font-size:15px">Ticket Code : ${
      this.ticketCode
    }.</span><br/><br/>
    <span style="font-size:15px">Ticket Information : ${
      this.description
    }.</span><br/><br/>
    <span style="font-size:15px;${
      this.priority.toLowerCase().indexOf('critical') != -1 ||
      this.priority.toLowerCase().indexOf('high') != -1
        ? 'background-color:#c9161c;color:white;padding:10px;border-radius:5px'
        : 'background-color:#3045cf;color:white;padding:10px;border-radius:5px'
    }">Ticket Priortity : ${this.priority}</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${
      process.env.NODE_ENV === 'Production'
        ? process.env.APP_URL_PROD
        : process.env.APP_URL_DEV
    }${this.links}" target="_blank">See Ticket</a>
    `;
    return trmplate;
  }

  public doneTicketByAdmin() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Hello ${this.recieverInfo}, Your ticket : ${this.subject} with Code : ${
      this.ticketCode
    } is done.</h1>
    <br/>
    <span style="font-size:15px">Ticket Code : ${
      this.ticketCode
    }.</span><br/><br/>
    <span style="font-size:15px">Ticket Information : ${
      this.description
    }.</span><br/><br/>
    <span style="font-size:15px;${
      this.priority.toLowerCase().indexOf('critical') != -1 ||
      this.priority.toLowerCase().indexOf('high') != -1
        ? 'background-color:#c9161c;color:white;padding:10px;border-radius:5px'
        : 'background-color:#3045cf;color:white;padding:10px;border-radius:5px'
    }">Ticket Priortity : ${this.priority}</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${
      process.env.NODE_ENV === 'Production'
        ? process.env.APP_URL_PROD
        : process.env.APP_URL_DEV
    }${this.links}" target="_blank">See Ticket</a>
    `;
    return trmplate;
  }

  public doneTicketByClient() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Hello ${this.recieverInfo}, You have one new ticket</h1>
    <br/>
    <span style="font-size:15px">Ticket Code : ${
      this.ticketCode
    }.</span><br/><br/>
    <span style="font-size:15px">Ticket Information : ${
      this.description
    }.</span><br/><br/>
    <span style="font-size:15px;${
      this.priority.toLowerCase().indexOf('critical') != -1 ||
      this.priority.toLowerCase().indexOf('high') != -1
        ? 'background-color:#c9161c;color:white;padding:10px;border-radius:5px'
        : 'background-color:#3045cf;color:white;padding:10px;border-radius:5px'
    }">Ticket Priortity : ${this.priority}</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${
      process.env.NODE_ENV === 'Production'
        ? process.env.APP_URL_PROD
        : process.env.APP_URL_DEV
    }${this.links}" target="_blank">See Ticket</a>
    `;
    return trmplate;
  }

  public claimTicketByClient() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Hello ${this.recieverInfo}, Your client has claim on ticket</h1>
    <br/>
    <span style="font-size:15px">Ticket Code : ${
      this.ticketCode
    }.</span><br/><br/>
    <span style="font-size:15px">Ticket Information : ${
      this.description
    }.</span><br/><br/>
    <span style="font-size:15px;${
      this.priority.toLowerCase().indexOf('critical') != -1 ||
      this.priority.toLowerCase().indexOf('high') != -1
        ? 'background-color:#c9161c;color:white;padding:10px;border-radius:5px'
        : 'background-color:#3045cf;color:white;padding:10px;border-radius:5px'
    }">Ticket Priortity : ${this.priority}</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${
      process.env.NODE_ENV === 'Production'
        ? process.env.APP_URL_PROD
        : process.env.APP_URL_DEV
    }${this.links}" target="_blank">See Ticket</a>
    `;
    return trmplate;
  }

  public feedbackTicketByClient() {
    const trmplate = `
    <h1 style="background-color:#f2f5fc;color:#012970;padding:10px;text-align:center;border-radius: 5px;">
    Hello ${this.recieverInfo}, Your client register feedback on ticket</h1>
    <br/>
    <span style="font-size:15px">Ticket Code : ${
      this.ticketCode
    }.</span><br/><br/>
    <span style="font-size:15px">Ticket Information : ${
      this.description
    }.</span><br/><br/>
    <span style="font-size:15px;${
      this.priority.toLowerCase().indexOf('critical') != -1 ||
      this.priority.toLowerCase().indexOf('high') != -1
        ? 'background-color:#c9161c;color:white;padding:10px;border-radius:5px'
        : 'background-color:#3045cf;color:white;padding:10px;border-radius:5px'
    }">Ticket Priortity : ${this.priority}</span><br/><br/>
    <a style="color: #fff;
    background-color: #012970;
    padding: 20px;
    text-align: center;
    line-height: 65px;
    text-decoration: none;
    border-radius: 10px;
    font-size: 15px;" href="${
      process.env.NODE_ENV === 'Production'
        ? process.env.APP_URL_PROD
        : process.env.APP_URL_DEV
    }${this.links}" target="_blank">See Ticket</a>
    `;
    return trmplate;
  }
}
