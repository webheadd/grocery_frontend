import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartFabComponent } from './cart-fab.component';

describe('CartFabComponent', () => {
  let component: CartFabComponent;
  let fixture: ComponentFixture<CartFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartFabComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
