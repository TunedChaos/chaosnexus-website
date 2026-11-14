// chaosnexus-website/tests/smoke.spec.ts
/**
 * Critical-route smoke checks against VitePress preview.
 * Uses structural landmarks (roles / CSS) rather than locale-specific copy.
 */
import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', landmark: '.VPHero' },
  { path: '/guide/quickstart', landmark: '.VPDoc' },
  { path: '/api/rhai/', landmark: '.VPDoc' },
] as const;

for (const { path, landmark } of routes) {
  test(`smoke ${path} returns 200 with nav and content landmark`, async ({
    page,
  }) => {
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });
    expect(response, `response for ${path}`).not.toBeNull();
    expect(response!.status(), `status for ${path}`).toBe(200);

    await expect(page.locator('nav.VPNav, .VPNavBar').first()).toBeVisible();
    await expect(page.locator(landmark).first()).toBeVisible();
    await expect(page.locator('h1').first()).toBeVisible();
  });
}
