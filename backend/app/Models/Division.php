<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'parent_id',
        'level',
        'employee_count',
        'ambassador_name'
    ];

    /**
     * Get the parent division of the current division.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(Division::class, 'parent_id');
    }

    /**
     * Get the subdivisions of the parent entity.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function subdivisions()
    {
        return $this->hasMany(Division::class, 'parent_id');
    }

    /**
     * Get the ambassador associated with this model.
     */
    public function ambassador()
    {
        return $this->belongsTo(Ambassador::class, 'ambassador_id');
    }
}
