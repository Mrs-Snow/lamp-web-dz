import type { RouteRecordRaw } from 'vue-router';

import { useAppStore } from '/@/store/modules/app';
import { usePermissionStore } from '/@/store/modules/permission';
import { useUserStore } from '/@/store/modules/user';

import { useTabs } from './useTabs';

import { router, resetRouter } from '/@/router';
// import { RootRoute } from '/@/router/routes';

import projectSetting from '/@/settings/projectSetting';
import { PermissionModeEnum } from '/@/enums/appEnum';
import { RoleEnum, PermMode } from '/@/enums/roleEnum';

import { intersection } from 'lodash-es';
import { isArray } from '/@/utils/is';
import { useMultipleTabStore } from '/@/store/modules/multipleTab';

function containsAll(maxList: string[], minList: string[]) {
  return intersection(maxList, minList).length == minList.length;
}

function isPermitted(permissionsOwns: WildcardPermission[], toBeVerified: WildcardPermission) {
  if (permissionsOwns == null || permissionsOwns.length === 0) {
    return false;
  }
  for (const owned of permissionsOwns) {
    if (owned.implies(toBeVerified)) {
      return true;
    }
  }
  return false;
}

class WildcardPermission {
  WILDCARD_TOKEN = '*';
  PART_DIVIDER_TOKEN = ':';
  SUBPART_DIVIDER_TOKEN = ',';
  parts: string[][];
  constructor(wildcardString: string, caseSensitive: boolean) {
    this.parts = [];
    this._init_(wildcardString, caseSensitive);
  }

  _init_(wildcardString: string, caseSensitive: boolean) {
    if (wildcardString == null || wildcardString.trim().length === 0) {
      throw new Error('权限编码通配符字符串不能为null或空。确保权限字符串的格式正确。');
    }
    wildcardString = wildcardString.trim();
    const parts: string[] = wildcardString.split(this.PART_DIVIDER_TOKEN);
    this.parts = [];
    for (const part of parts) {
      let subParts: string[] = part.split(this.SUBPART_DIVIDER_TOKEN);
      if (!caseSensitive) {
        const lowerSubParts: string[] = [];
        for (const subPart of subParts) {
          lowerSubParts.push(subPart.toLocaleLowerCase());
        }
        subParts = lowerSubParts;
      }
      if (subParts.length <= 0) {
        throw new Error(
          '权限编码通配符字符串不能包含只有分隔符的部分，确保权限编码字符串的格式正确。',
        );
      }
      this.parts.push(subParts);
    }

    if (this.parts.length <= 0) {
      throw new Error('权限编码通配符字符串不能只包含分隔符，确保权限编码字符串的格式正确。');
    }
  }

  implies(toBeVerified: WildcardPermission) {
    const toBeVerifiedParts = toBeVerified.parts;
    let i = 0;
    for (const toBeVerifiedPart of toBeVerifiedParts) {
      // 如果此权限的部分数少于其他权限，则此权限中包含的部分数之后的所有内容都将自动隐含，因此返回true
      if (this.parts.length - 1 < i) {
        return false;
      } else {
        const part = this.parts[i];
        if (!part.includes(this.WILDCARD_TOKEN) && !containsAll(part, toBeVerifiedPart)) {
          return false;
        }
        i++;
      }
    }

    // 如果此权限的部分多于其他部分，则仅当所有其他部分都是通配符时才暗示它
    for (; i < this.parts.length; i++) {
      const part = this.parts[i];
      if (!part.includes(this.WILDCARD_TOKEN)) {
        return false;
      }
    }
    return true;
  }
}
const map = {
  permissionsOwns: [] as WildcardPermission[],
};

// User permissions related operations
export function usePermission() {
  const userStore = useUserStore();
  const appStore = useAppStore();
  const permissionStore = usePermissionStore();
  const { closeAll } = useTabs(router);

  /**
   * Change permission mode
   */
  async function togglePermissionMode() {
    appStore.setProjectConfig({
      permissionMode:
        projectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROUTE_MAPPING
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }

  /**
   * Reset and regain authority resource information
   * @param id
   */
  async function resume() {
    const tabStore = useMultipleTabStore();
    tabStore.clearCacheTabs();
    resetRouter();
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
    closeAll();
  }
  /**
   * 必须包含列出的所有权限，元素才显示
   */
  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    return isPermission(value, def, PermMode.Has);
  }
  /**
   * 当不包含列出的权限时，渲染该元素
   */
  function hasNoPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    return isPermission(value, def, PermMode.HasNo);
  }
  /**
   * 只要包含列出的任意一个权限，元素就会显示
   */
  function hasAnyPermission(
    value?: RoleEnum | RoleEnum[] | string | string[],
    def = true,
  ): boolean {
    return isPermission(value, def, PermMode.HasAny);
  }
  /**
   * 判断权限
   */
  function isPermission(
    value?: RoleEnum | RoleEnum[] | string | string[],
    def = true,
    mode = PermMode.Has,
  ): boolean {
    // Visible by default
    if (!value) {
      return def;
    }

    const permMode = projectSetting.permissionMode;

    if ([PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(permMode)) {
      if (!isArray(value)) {
        return userStore.getRoleList?.includes(value as RoleEnum);
      }
      return (intersection(value, userStore.getRoleList) as RoleEnum[]).length > 0;
    }

    if (PermissionModeEnum.BACK === permMode) {
      const visibleResource = permissionStore.getVisibleResource;
      const enabled = visibleResource?.enabled;
      if (!enabled) {
        return true;
      }

      let flag = true;
      if (mode === PermMode.HasAny) {
        flag = false;
      }
      const resourceList = visibleResource.resourceList;
      const caseSensitive = visibleResource.caseSensitive;
      // 待校验权限 一定要是数组
      let permissions = value;
      if (!isArray(value)) {
        permissions = [value];
      }

      if (permissions != null && permissions.length > 0) {
        // 转换拥有的权限
        let permissionsOwns: WildcardPermission[] = [];
        if (map.permissionsOwns && map.permissionsOwns.length > 0) {
          permissionsOwns = map.permissionsOwns;
        } else {
          for (const resource of resourceList) {
            permissionsOwns.push(new WildcardPermission(resource, caseSensitive));
          }
          map.permissionsOwns = permissionsOwns;
        }

        for (const strPerm of permissions) {
          const toBeVerified = new WildcardPermission(strPerm, caseSensitive);
          if (mode === PermMode.Has) {
            if (!isPermitted(permissionsOwns, toBeVerified)) {
              flag = false;
            }
          } else if (mode === PermMode.HasNo) {
            if (isPermitted(permissionsOwns, toBeVerified)) {
              flag = false;
            }
          } else if (mode === PermMode.HasAny) {
            if (isPermitted(permissionsOwns, toBeVerified)) {
              flag = true;
            }
          }
        }
      }

      return flag;
    }
    return true;
  }

  /**
   * Change roles
   * @param roles
   */
  async function changeRole(roles: RoleEnum | RoleEnum[]): Promise<void> {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROUTE_MAPPING) {
      throw new Error(
        'Please switch PermissionModeEnum to ROUTE_MAPPING mode in the configuration to operate!',
      );
    }

    if (!isArray(roles)) {
      roles = [roles];
    }
    userStore.setRoleList(roles);
    await resume();
  }

  /**
   * refresh menu data
   */
  async function refreshMenu() {
    resume();
  }

  return {
    changeRole,
    isPermission,
    hasPermission,
    hasNoPermission,
    hasAnyPermission,
    togglePermissionMode,
    refreshMenu,
  };
}
