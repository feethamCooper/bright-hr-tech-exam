import { act } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { mockBrightHrAPi } from "utils/test";
import useBrightHrApi from "./useBrightHrApi";

describe("useBrightHrApi hook", () => {
  test("should initially output empty absence array & conflicts should be undefined", () => {
    const { result } = renderHook(() => useBrightHrApi());
    const { current } = result;
    expect(current.absences.length).toBe(0);
    expect(current.conflicts).toBe(undefined);
  });

  test("should be populated with correct number of data for API calls", async () => {
    mockBrightHrAPi();
    const { result } = renderHook(() => useBrightHrApi());
    act(() => result.current.handleGetApiData());
    await waitFor(() => result.current.absences.length !== 0);
    expect(result.current.absences.length).toBe(1);
  });
});
