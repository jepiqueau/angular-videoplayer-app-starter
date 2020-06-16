import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullscreenPage } from './fullscreen.page';

describe('FullscreenPage', () => {
  let component: FullscreenPage;
  let fixture: ComponentFixture<FullscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
