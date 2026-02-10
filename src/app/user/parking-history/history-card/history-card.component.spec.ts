import { TestBed } from '@angular/core/testing';
import { HistoryCardComponent } from './history-card.component';
import { ParkingHistory } from '../../../models/parking-history';

describe('HistoryCardComponent', () => {
  const history: ParkingHistory = {
    TicketId: 'T1',
    NumberPlate: 'ABC123',
    BuildingId: 'B1',
    BuildingName: 'Main',
    FLoorNumber: 2,
    SlotNumber: 10,
    StartTime: '2023-01-01T10:00:00Z',
    EndTime: '2023-01-01T11:30:00Z',
    VechicleType: 'TwoWheeler',
  };

  function createComponent(): HistoryCardComponent {
    TestBed.configureTestingModule({
      imports: [HistoryCardComponent],
    }).overrideComponent(HistoryCardComponent, {
      set: { template: '' },
    });

    const fixture = TestBed.createComponent(HistoryCardComponent);
    const component = fixture.componentInstance;
    fixture.componentRef.setInput('history', history);
    fixture.detectChanges();
    return component;
  }

  it('should pick icon based on vehicle type', () => {
    const component = createComponent();
    expect(component.getVehicleTypeIcon('TwoWheeler')).toBe('pi-circle');
    expect(component.getVehicleTypeIcon('FourWheeler')).toBe('pi-stop');
  });

  it('should pick severity based on vehicle type', () => {
    const component = createComponent();
    expect(component.getVehicleTypeSeverity('TwoWheeler')).toBe('info');
    expect(component.getVehicleTypeSeverity('FourWheeler')).toBe('help');
  });

  it('should calculate duration', () => {
    const component = createComponent();
    const duration = component.calculateDuration('2023-01-01T10:00:00Z', '2023-01-01T11:30:00Z');
    expect(duration).toBe('1h 30m');

    const short = component.calculateDuration('2023-01-01T10:00:00Z', '2023-01-01T10:20:00Z');
    expect(short).toBe('20m');
  });

  it('should format date time', () => {
    const component = createComponent();
    const formatted = component.formatDateTime('2023-01-01T10:00:00Z');
    expect(formatted).toContain('2023');
  });
});
