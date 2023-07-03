<?php

namespace App\Http\Controllers;

use App\Models\Division;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    /**
     * Get all divisions and return them as a JSON response.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $page = $request->get('page');
        $result = $request->get('size');
        $filter = $request->get('filter');
        $sorter = $request->get('sorter');
        // Retrieve all divisions from the database
        $divisions = Division::when(!empty($page), function ($query) use ($page, $result, $filter, $sorter) {
            $query->when(!empty($sorter), function ($q) use ($sorter) {
                $sorter = json_decode($sorter);
                $q->orderBy($sorter->columnKey, $sorter->order == 'ascend' ? 'asc' : 'desc');
            })->when(!empty($filter), function ($q) use ($filter) {
                $filter = json_decode($filter);
                foreach ($filter as $value) {
                    $q->orWhere('name', 'LIKE', "%{$value}%");
                }
            })->with('parent')->with('subdivisions')->withCount('subdivisions');
        });
        $divisions = empty($page) ? $divisions->get() : $divisions->paginate($result, ['*'], 'page', $page);
        // Return the divisions as a JSON response
        return response()->json($divisions, 200);
    }

    /**
     * Store a newly created division in the database.
     *
     * @param  Request  $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|unique:divisions|max:45',
            'parent_id' => 'nullable|exists:divisions,id',
            'level' => 'required|integer|min:0',
            'employee_count' => 'required|integer|min:0',
            'ambassador_name' => 'nullable|string',
        ]);

        // Create a new division using the request data
        $division = Division::create($request->all());

        // Return a JSON response with the created division and HTTP status code 201
        return response()->json($division, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Division  $division
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Division $division)
    {
        // Return the division as a JSON response
        return response()->json($division);
    }

    /**
     * Update a division.
     *
     * @param Request $request The HTTP request object.
     * @param Division $division The division to update.
     * @return \Illuminate\Http\JsonResponse The updated division as JSON.
     */
    public function update(Request $request, Division $division)
    {
        // Validate the request data
        $request->validate([
            'name' => 'required|unique:divisions,name,' . $division->id . '|max:45',
            'parent_id' => 'nullable|exists:divisions,id',
            'level' => 'required|integer|min:0',
            'employee_count' => 'required|integer|min:0',
            'ambassador_name' => 'nullable|string',
        ]);

        // Update the division with the request data
        $division->update($request->all());

        // Return the updated division as JSON
        return response()->json($division);
    }

    /**
     * Delete a division.
     *
     * @param Division $division The division to be deleted.
     * @return \Illuminate\Http\JsonResponse The JSON response with null data and status code 204.
     */
    public function destroy(Division $division)
    {
        // Delete the division
        $division->delete();

        // Return JSON response with null data and status code 204
        return response()->json(null, 204);
    }

    /**
     * Retrieve the subdivisions of a given division.
     *
     * @param Division $division The division object.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the subdivisions.
     */
    public function subdivisions(Division $division)
    {
        // Retrieve the subdivisions from the division object.
        $subdivisions = $division->subdivisions;

        // Return the subdivisions as a JSON response.
        return response()->json($subdivisions);
    }

    /**
     * Get the data columns for the given request.
     *
     * @param Request $request The request object.
     *
     * @return \Illuminate\Http\JsonResponse The JSON response containing the data columns.
     */
    public function getDataColumns($column)
    {
        // Get the data from the database and convert it to an array
        $result = Division::pluck($column)->toArray();

        // Return the data as a JSON response
        return response()->json($result);
    }
}
