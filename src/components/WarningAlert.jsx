import Alert from './Alert';

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#ff9500';
    this.bgColor = '#fff4e6';
  }
}

export default WarningAlert;