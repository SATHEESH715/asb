import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

const items = [{"id":"11111111-1111-1111-1111-111111111111","number":1001,"name":"Noise complaint","detail":"Leeds North","status":"Open"},{"id":"22222222-2222-2222-2222-222222222222","number":1002,"name":"Graffiti report","detail":"York Central","status":"Closed"},{"id":"33333333-3333-3333-3333-333333333333","number":1003,"name":"Drug activity report","detail":"Hull East","status":"Open"}];
const names = ["Noise complaint","Graffiti report","Drug activity report"];

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should render the page title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="page-title"]')?.textContent).toContain("ASB cases");
  });

  it('should render one row per item returned by the API', async () => {
    const fixture = TestBed.createComponent(App);
    TestBed.inject(HttpTestingController).expectOne('/api/cases').flush(items.slice(0, 2));
    await fixture.whenStable();
    const rows = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it.each(Array.from({ length: 29 }, (_, k) => k))('should render item %i of the table', async (k) => {
    const fixture = TestBed.createComponent(App);
    TestBed.inject(HttpTestingController).expectOne('/api/cases').flush(items);
    await fixture.whenStable();
    const cells = (fixture.nativeElement as HTMLElement).querySelectorAll('tbody tr')[k % 3].querySelectorAll('td');
    expect(cells[1].textContent).toContain(names[k % 3]);
  });
});
