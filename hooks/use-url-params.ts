import { useCallback, useEffect, useState } from "react";

interface UrlParamsOptions<T> {
  /**
   * 参数名称对象，将您的状态键映射到 URL 参数名称
   */
  paramNames?: Record<keyof T, string>;
  /**
   * 是否在修改时同步到 URL (默认为 true)
   */
  syncToUrl?: boolean;
  /**
   * 是否使用 history.replaceState 代替 pushState (默认为 true)
   */
  replace?: boolean;
}

/**
 * 自定义 Hook，用于在组件状态和 URL 参数之间进行同步
 *
 * @param initialState 初始状态
 * @param options 配置选项
 * @returns [状态, 设置状态的函数]，类似于 useState
 */
function useUrlParams<T extends Record<string, any>>(
  initialState: T,
  options: UrlParamsOptions<T> = {},
): [T, (newState: Partial<T>) => void] {
  const {
    paramNames = {} as Record<keyof T, string>,
    syncToUrl = true,
    replace = true,
  } = options;

  // 创建默认的参数名映射（如果未提供）
  const resolvedParamNames: Record<keyof T, string> = {
    ...initialState,
  } as any;

  Object.keys(initialState).forEach((key) => {
    if (!(key in paramNames)) {
      resolvedParamNames[key as keyof T] = key;
    } else {
      resolvedParamNames[key as keyof T] = paramNames[key as keyof T];
    }
  });

  // 从 URL 读取初始参数值
  const getInitialStateFromUrl = useCallback((): T => {
    const url = new URL(window.location.href);
    const stateFromUrl = { ...initialState };

    Object.keys(initialState).forEach((key) => {
      const paramName = resolvedParamNames[key as keyof T];
      const paramValue = url.searchParams.get(paramName);
      if (paramValue !== null) {
        (stateFromUrl as any)[key] = paramValue;
      }
    });

    return stateFromUrl;
  }, [initialState, resolvedParamNames]);

  // 状态管理
  const [state, setState] = useState<T>(getInitialStateFromUrl);

  // 更新 URL 参数
  const updateUrlParams = useCallback(
    (values: Partial<T>) => {
      if (!syncToUrl) return;

      const url = new URL(window.location.href);

      Object.keys(values).forEach((key) => {
        const paramName = resolvedParamNames[key as keyof T];
        const value = values[key as keyof T];

        if (value === null || value === undefined || value === "") {
          url.searchParams.delete(paramName);
        } else {
          url.searchParams.set(paramName, String(value));
        }
      });

      // 使用 replaceState 或 pushState 更新 URL
      const historyMethod = replace ? "replaceState" : "pushState";
      window.history[historyMethod]({}, "", url);
    },
    [syncToUrl, resolvedParamNames, replace],
  );

  // 更新状态的函数
  const setStateAndUrl = useCallback(
    (newPartialState: Partial<T>) => {
      setState((prevState) => {
        const newState = { ...prevState, ...newPartialState };
        updateUrlParams(newPartialState);
        return newState;
      });
    },
    [updateUrlParams],
  );

  // 组件首次加载时从 URL 读取参数
  useEffect(() => {
    const stateFromUrl = getInitialStateFromUrl();
    setState(stateFromUrl);
  }, [getInitialStateFromUrl]);

  return [state, setStateAndUrl];
}

export default useUrlParams;
