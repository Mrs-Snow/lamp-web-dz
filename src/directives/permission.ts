/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @Example v-auth="RoleEnum.TEST"
 */
import type { App, Directive, DirectiveBinding } from 'vue';

import { usePermission } from '/@/hooks/web/usePermission';

function isAuth(el: Element, binding: any) {
  const { hasPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

function hasPermission(el: Element, binding: any) {
  const { hasPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

function withoutPermission(el: Element, binding: any) {
  const { withoutPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!withoutPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

function hasAnyPermission(el: Element, binding: any) {
  const { hasAnyPermission } = usePermission();

  const value = binding.value;
  if (!value) return;
  if (!hasAnyPermission(value)) {
    el.parentNode?.removeChild(el);
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};
const authDirective: Directive = {
  mounted,
};

const hasPermissionMounted = (el: Element, binding: DirectiveBinding<any>) => {
  hasPermission(el, binding);
};
export const hasPermissionDirective: Directive = {
  mounted: hasPermissionMounted,
};
const withoutPermissionMounted = (el: Element, binding: DirectiveBinding<any>) => {
  withoutPermission(el, binding);
};
export const withoutPermissionDirective: Directive = {
  mounted: withoutPermissionMounted,
};
const hasAnyPermissionMounted = (el: Element, binding: DirectiveBinding<any>) => {
  hasAnyPermission(el, binding);
};
export const hasAnyPermissionDirective: Directive = {
  mounted: hasAnyPermissionMounted,
};

export function setupPermissionDirective(app: App) {
  app.directive('auth', authDirective);
  app.directive('hasPermission', hasPermissionDirective);
  app.directive('withoutPermission', withoutPermissionDirective);
  app.directive('hasAnyPermission', hasAnyPermissionDirective);
}

export default authDirective;
