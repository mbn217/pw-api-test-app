import { test, expect } from '@playwright/test';

// test.beforeEach('has title', async ({ page }) => {
//   await page.goto('https://conduit.bondaracademy.com/');
// });

// test('has title', async ({ page }) => {
//   await expect(page.locator('.navbar-brand')).toHaveText('conduit');
// });

//Post request to add new pet https://petstore.swagger.io/
test.describe('Petstore API Tests', () => {

    test('Add a new pet', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
      data: {
        id: 0,
        category: { id: 0, name: 'Dogs' },
        name: 'Buddy',
        photoUrls: ['https://example.com/photo.jpg'],
        tags: [{ id: 0, name: 'friendly' }],
        status: 'available'
      }
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.name).toBe('Buddy');
    expect(responseBody.status).toBe('available');
  });


});

//Resturn Pet inventroies by status
test.describe('Petstore API Tests', () => {
  test('Get pet inventory by status', async ({ request }) => {
    const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus?status=available');

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
    console.log("----- Pet Inventory by Status -----");
    console.log(responseBody);
  });
});


//Delete a pet by ID
test.describe('Petstore API Tests', () => {
  test('Delete a pet by ID', async ({ request }) => {
    // First, add a new pet to delete
    const addResponse = await request.post('https://petstore.swagger.io/v2/pet', {
      data: {
        id: 454,
        category: { id: 0, name: 'Cats' },
        name: 'Whiskers',
        photoUrls: ['https://example.com/photo.jpg'],
        tags: [{ id: 0, name: 'cute' }],
        status: 'available'
      }
    });

    expect(addResponse.ok()).toBeTruthy();
    const addedPet = await addResponse.json();
    const petId = addedPet.id;

    // Now delete the pet
    const deleteResponse = await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);
    expect(deleteResponse.ok()).toBeTruthy();
    console.log(`Pet with ID ${petId} deleted successfully.`);
  });
});

