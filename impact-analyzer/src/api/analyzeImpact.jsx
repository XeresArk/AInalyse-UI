export async function analyzeImpact(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        changedElements: [
          {
            type: "method",
            name: "com.employeeapp.service.EmployeeHelperService.promoteEmployee(Long, String)",
          },
        ],
        directImpacts: [
          {
            type: "method",
            name: "com.employeeapp.controller.EmployeeActionController.addEmployee(EmployeeRequest)",
          },
          { type: "endpoint", name: "POST /actions/add" },
          {
            type: "method",
            name: "com.employeeapp.controller.EmployeeAdminController.promoteEmployee(Long, String)",
          },
          { type: "endpoint", name: "POST /admin/promote/{id}" },
          {
            type: "method",
            name: "com.employeeapp.service.EmployeeAdminService.promoteEmployee(Long, String)",
          },
          {
            type: "method",
            name: "com.departmentapp.service.DepartmentEmployeeAdminService.promoteEmployee(Long, String)",
          },
        ],
        indirectImpacts: [
          {
            type: "method",
            name: "com.departmentapp.controller.DepartmentEmployeeController.promoteEmployee(Long, String)",
          },
          { type: "endpoint", name: "GET /employees/promote/{id}" },
        ],
        modulesImpacted: ["EmployeeApp", "DepartmentApp"],
        bitbucketurl: "https://bitbucket.org/example-repo",
        impactScore: 91,
        reasoning:
          "The 'promoteEmployee' method was removed, causing direct and cross-module impact...",
      });
    }, 1500);
  });
}
