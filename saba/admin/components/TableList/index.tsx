
import React from "react"
import './style.scss'


export default function TableList() {


    return (
        <div className="card">
            {/* <div className="table-title">
                <h2>CSS ONLY TABLE</h2>
            </div>
            <div className="button-container"><span>These buttons aren't working ></span>
                <button className="danger" title="Delete Selected">
                    <svg viewBox="0 0 448 512" width="16" title="trash-alt">
                        <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path>
                    </svg>
                </button>
                <button className="primary" title="Add New Data">
                    <svg viewBox="0 0 512 512" width="16" title="plus-circle">
                        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"></path>
                    </svg>
                </button>
            </div> */}
            <div className="table-concept">
                <input className="table-radio" type="radio" name="table_radio" id="table_radio_0" checked="checked" />
                <div className="table-display">Showing 1 to 20
                    of 95 items
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th>
                            <th>FIRST HEADER</th>
                            <th>SECOND HEADER</th>
                            <th>THIRD HEADER</th>
                            <th>FOURTH HEADER</th>
                            <th>FIFTH HEADER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>1</td>
                            <td>This is Item number 1-1</td>
                            <td>This is Item number 2-1</td>
                            <td>This is Item number 3-1</td>
                            <td>This is Item number 4-1</td>
                            <td>This is Item number 5-1</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>2</td>
                            <td>This is Item number 1-2</td>
                            <td>This is Item number 2-2</td>
                            <td>This is Item number 3-2</td>
                            <td>This is Item number 4-2</td>
                            <td>This is Item number 5-2</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>3</td>
                            <td>This is Item number 1-3</td>
                            <td>This is Item number 2-3</td>
                            <td>This is Item number 3-3</td>
                            <td>This is Item number 4-3</td>
                            <td>This is Item number 5-3</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>4</td>
                            <td>This is Item number 1-4</td>
                            <td>This is Item number 2-4</td>
                            <td>This is Item number 3-4</td>
                            <td>This is Item number 4-4</td>
                            <td>This is Item number 5-4</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>5</td>
                            <td>This is Item number 1-5</td>
                            <td>This is Item number 2-5</td>
                            <td>This is Item number 3-5</td>
                            <td>This is Item number 4-5</td>
                            <td>This is Item number 5-5</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>6</td>
                            <td>This is Item number 1-6</td>
                            <td>This is Item number 2-6</td>
                            <td>This is Item number 3-6</td>
                            <td>This is Item number 4-6</td>
                            <td>This is Item number 5-6</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>7</td>
                            <td>This is Item number 1-7</td>
                            <td>This is Item number 2-7</td>
                            <td>This is Item number 3-7</td>
                            <td>This is Item number 4-7</td>
                            <td>This is Item number 5-7</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>8</td>
                            <td>This is Item number 1-8</td>
                            <td>This is Item number 2-8</td>
                            <td>This is Item number 3-8</td>
                            <td>This is Item number 4-8</td>
                            <td>This is Item number 5-8</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>9</td>
                            <td>This is Item number 1-9</td>
                            <td>This is Item number 2-9</td>
                            <td>This is Item number 3-9</td>
                            <td>This is Item number 4-9</td>
                            <td>This is Item number 5-9</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>10</td>
                            <td>This is Item number 1-10</td>
                            <td>This is Item number 2-10</td>
                            <td>This is Item number 3-10</td>
                            <td>This is Item number 4-10</td>
                            <td>This is Item number 5-10</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>11</td>
                            <td>This is Item number 1-11</td>
                            <td>This is Item number 2-11</td>
                            <td>This is Item number 3-11</td>
                            <td>This is Item number 4-11</td>
                            <td>This is Item number 5-11</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>12</td>
                            <td>This is Item number 1-12</td>
                            <td>This is Item number 2-12</td>
                            <td>This is Item number 3-12</td>
                            <td>This is Item number 4-12</td>
                            <td>This is Item number 5-12</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>13</td>
                            <td>This is Item number 1-13</td>
                            <td>This is Item number 2-13</td>
                            <td>This is Item number 3-13</td>
                            <td>This is Item number 4-13</td>
                            <td>This is Item number 5-13</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>14</td>
                            <td>This is Item number 1-14</td>
                            <td>This is Item number 2-14</td>
                            <td>This is Item number 3-14</td>
                            <td>This is Item number 4-14</td>
                            <td>This is Item number 5-14</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>15</td>
                            <td>This is Item number 1-15</td>
                            <td>This is Item number 2-15</td>
                            <td>This is Item number 3-15</td>
                            <td>This is Item number 4-15</td>
                            <td>This is Item number 5-15</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>16</td>
                            <td>This is Item number 1-16</td>
                            <td>This is Item number 2-16</td>
                            <td>This is Item number 3-16</td>
                            <td>This is Item number 4-16</td>
                            <td>This is Item number 5-16</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>17</td>
                            <td>This is Item number 1-17</td>
                            <td>This is Item number 2-17</td>
                            <td>This is Item number 3-17</td>
                            <td>This is Item number 4-17</td>
                            <td>This is Item number 5-17</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>18</td>
                            <td>This is Item number 1-18</td>
                            <td>This is Item number 2-18</td>
                            <td>This is Item number 3-18</td>
                            <td>This is Item number 4-18</td>
                            <td>This is Item number 5-18</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>19</td>
                            <td>This is Item number 1-19</td>
                            <td>This is Item number 2-19</td>
                            <td>This is Item number 3-19</td>
                            <td>This is Item number 4-19</td>
                            <td>This is Item number 5-19</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>20</td>
                            <td>This is Item number 1-20</td>
                            <td>This is Item number 2-20</td>
                            <td>This is Item number 3-20</td>
                            <td>This is Item number 4-20</td>
                            <td>This is Item number 5-20</td>
                        </tr>
                    </tbody>
                </table>
                <div className="pagination">
                    <label className="disabled" for="table_radio_-1">&laquo; Previous</label>
                    <label className="active" for="table_radio_0" id="table_pager_0">1</label>
                    <label for="table_radio_1" id="table_pager_1">2</label>
                    <label for="table_radio_2" id="table_pager_2">3</label>
                    <label for="table_radio_3" id="table_pager_3">4</label>
                    <label for="table_radio_4" id="table_pager_4">5</label>
                    <label for="table_radio_1">Next &raquo;</label>
                </div>
                <input className="table-radio" type="radio" name="table_radio" id="table_radio_1" />
                <div className="table-display">Showing 21 to 40
                    of 95 items
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th>
                            <th>FIRST HEADER</th>
                            <th>SECOND HEADER</th>
                            <th>THIRD HEADER</th>
                            <th>FOURTH HEADER</th>
                            <th>FIFTH HEADER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>21</td>
                            <td>This is Item number 1-21</td>
                            <td>This is Item number 2-21</td>
                            <td>This is Item number 3-21</td>
                            <td>This is Item number 4-21</td>
                            <td>This is Item number 5-21</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>22</td>
                            <td>This is Item number 1-22</td>
                            <td>This is Item number 2-22</td>
                            <td>This is Item number 3-22</td>
                            <td>This is Item number 4-22</td>
                            <td>This is Item number 5-22</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>23</td>
                            <td>This is Item number 1-23</td>
                            <td>This is Item number 2-23</td>
                            <td>This is Item number 3-23</td>
                            <td>This is Item number 4-23</td>
                            <td>This is Item number 5-23</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>24</td>
                            <td>This is Item number 1-24</td>
                            <td>This is Item number 2-24</td>
                            <td>This is Item number 3-24</td>
                            <td>This is Item number 4-24</td>
                            <td>This is Item number 5-24</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>25</td>
                            <td>This is Item number 1-25</td>
                            <td>This is Item number 2-25</td>
                            <td>This is Item number 3-25</td>
                            <td>This is Item number 4-25</td>
                            <td>This is Item number 5-25</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>26</td>
                            <td>This is Item number 1-26</td>
                            <td>This is Item number 2-26</td>
                            <td>This is Item number 3-26</td>
                            <td>This is Item number 4-26</td>
                            <td>This is Item number 5-26</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>27</td>
                            <td>This is Item number 1-27</td>
                            <td>This is Item number 2-27</td>
                            <td>This is Item number 3-27</td>
                            <td>This is Item number 4-27</td>
                            <td>This is Item number 5-27</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>28</td>
                            <td>This is Item number 1-28</td>
                            <td>This is Item number 2-28</td>
                            <td>This is Item number 3-28</td>
                            <td>This is Item number 4-28</td>
                            <td>This is Item number 5-28</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>29</td>
                            <td>This is Item number 1-29</td>
                            <td>This is Item number 2-29</td>
                            <td>This is Item number 3-29</td>
                            <td>This is Item number 4-29</td>
                            <td>This is Item number 5-29</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>30</td>
                            <td>This is Item number 1-30</td>
                            <td>This is Item number 2-30</td>
                            <td>This is Item number 3-30</td>
                            <td>This is Item number 4-30</td>
                            <td>This is Item number 5-30</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>31</td>
                            <td>This is Item number 1-31</td>
                            <td>This is Item number 2-31</td>
                            <td>This is Item number 3-31</td>
                            <td>This is Item number 4-31</td>
                            <td>This is Item number 5-31</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>32</td>
                            <td>This is Item number 1-32</td>
                            <td>This is Item number 2-32</td>
                            <td>This is Item number 3-32</td>
                            <td>This is Item number 4-32</td>
                            <td>This is Item number 5-32</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>33</td>
                            <td>This is Item number 1-33</td>
                            <td>This is Item number 2-33</td>
                            <td>This is Item number 3-33</td>
                            <td>This is Item number 4-33</td>
                            <td>This is Item number 5-33</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>34</td>
                            <td>This is Item number 1-34</td>
                            <td>This is Item number 2-34</td>
                            <td>This is Item number 3-34</td>
                            <td>This is Item number 4-34</td>
                            <td>This is Item number 5-34</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>35</td>
                            <td>This is Item number 1-35</td>
                            <td>This is Item number 2-35</td>
                            <td>This is Item number 3-35</td>
                            <td>This is Item number 4-35</td>
                            <td>This is Item number 5-35</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>36</td>
                            <td>This is Item number 1-36</td>
                            <td>This is Item number 2-36</td>
                            <td>This is Item number 3-36</td>
                            <td>This is Item number 4-36</td>
                            <td>This is Item number 5-36</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>37</td>
                            <td>This is Item number 1-37</td>
                            <td>This is Item number 2-37</td>
                            <td>This is Item number 3-37</td>
                            <td>This is Item number 4-37</td>
                            <td>This is Item number 5-37</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>38</td>
                            <td>This is Item number 1-38</td>
                            <td>This is Item number 2-38</td>
                            <td>This is Item number 3-38</td>
                            <td>This is Item number 4-38</td>
                            <td>This is Item number 5-38</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>39</td>
                            <td>This is Item number 1-39</td>
                            <td>This is Item number 2-39</td>
                            <td>This is Item number 3-39</td>
                            <td>This is Item number 4-39</td>
                            <td>This is Item number 5-39</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>40</td>
                            <td>This is Item number 1-40</td>
                            <td>This is Item number 2-40</td>
                            <td>This is Item number 3-40</td>
                            <td>This is Item number 4-40</td>
                            <td>This is Item number 5-40</td>
                        </tr>
                    </tbody>
                </table>
                <div className="pagination">
                    <label for="table_radio_0">&laquo; Previous</label>
                    <label for="table_radio_0" id="table_pager_0">1</label>
                    <label className="active" for="table_radio_1" id="table_pager_1">2</label>
                    <label for="table_radio_2" id="table_pager_2">3</label>
                    <label for="table_radio_3" id="table_pager_3">4</label>
                    <label for="table_radio_4" id="table_pager_4">5</label>
                    <label for="table_radio_2">Next &raquo;</label>
                </div>
                <input className="table-radio" type="radio" name="table_radio" id="table_radio_2" />
                <div className="table-display">Showing 41 to 60
                    of 95 items
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th>
                            <th>FIRST HEADER</th>
                            <th>SECOND HEADER</th>
                            <th>THIRD HEADER</th>
                            <th>FOURTH HEADER</th>
                            <th>FIFTH HEADER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>41</td>
                            <td>This is Item number 1-41</td>
                            <td>This is Item number 2-41</td>
                            <td>This is Item number 3-41</td>
                            <td>This is Item number 4-41</td>
                            <td>This is Item number 5-41</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>42</td>
                            <td>This is Item number 1-42</td>
                            <td>This is Item number 2-42</td>
                            <td>This is Item number 3-42</td>
                            <td>This is Item number 4-42</td>
                            <td>This is Item number 5-42</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>43</td>
                            <td>This is Item number 1-43</td>
                            <td>This is Item number 2-43</td>
                            <td>This is Item number 3-43</td>
                            <td>This is Item number 4-43</td>
                            <td>This is Item number 5-43</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>44</td>
                            <td>This is Item number 1-44</td>
                            <td>This is Item number 2-44</td>
                            <td>This is Item number 3-44</td>
                            <td>This is Item number 4-44</td>
                            <td>This is Item number 5-44</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>45</td>
                            <td>This is Item number 1-45</td>
                            <td>This is Item number 2-45</td>
                            <td>This is Item number 3-45</td>
                            <td>This is Item number 4-45</td>
                            <td>This is Item number 5-45</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>46</td>
                            <td>This is Item number 1-46</td>
                            <td>This is Item number 2-46</td>
                            <td>This is Item number 3-46</td>
                            <td>This is Item number 4-46</td>
                            <td>This is Item number 5-46</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>47</td>
                            <td>This is Item number 1-47</td>
                            <td>This is Item number 2-47</td>
                            <td>This is Item number 3-47</td>
                            <td>This is Item number 4-47</td>
                            <td>This is Item number 5-47</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>48</td>
                            <td>This is Item number 1-48</td>
                            <td>This is Item number 2-48</td>
                            <td>This is Item number 3-48</td>
                            <td>This is Item number 4-48</td>
                            <td>This is Item number 5-48</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>49</td>
                            <td>This is Item number 1-49</td>
                            <td>This is Item number 2-49</td>
                            <td>This is Item number 3-49</td>
                            <td>This is Item number 4-49</td>
                            <td>This is Item number 5-49</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>50</td>
                            <td>This is Item number 1-50</td>
                            <td>This is Item number 2-50</td>
                            <td>This is Item number 3-50</td>
                            <td>This is Item number 4-50</td>
                            <td>This is Item number 5-50</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>51</td>
                            <td>This is Item number 1-51</td>
                            <td>This is Item number 2-51</td>
                            <td>This is Item number 3-51</td>
                            <td>This is Item number 4-51</td>
                            <td>This is Item number 5-51</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>52</td>
                            <td>This is Item number 1-52</td>
                            <td>This is Item number 2-52</td>
                            <td>This is Item number 3-52</td>
                            <td>This is Item number 4-52</td>
                            <td>This is Item number 5-52</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>53</td>
                            <td>This is Item number 1-53</td>
                            <td>This is Item number 2-53</td>
                            <td>This is Item number 3-53</td>
                            <td>This is Item number 4-53</td>
                            <td>This is Item number 5-53</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>54</td>
                            <td>This is Item number 1-54</td>
                            <td>This is Item number 2-54</td>
                            <td>This is Item number 3-54</td>
                            <td>This is Item number 4-54</td>
                            <td>This is Item number 5-54</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>55</td>
                            <td>This is Item number 1-55</td>
                            <td>This is Item number 2-55</td>
                            <td>This is Item number 3-55</td>
                            <td>This is Item number 4-55</td>
                            <td>This is Item number 5-55</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>56</td>
                            <td>This is Item number 1-56</td>
                            <td>This is Item number 2-56</td>
                            <td>This is Item number 3-56</td>
                            <td>This is Item number 4-56</td>
                            <td>This is Item number 5-56</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>57</td>
                            <td>This is Item number 1-57</td>
                            <td>This is Item number 2-57</td>
                            <td>This is Item number 3-57</td>
                            <td>This is Item number 4-57</td>
                            <td>This is Item number 5-57</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>58</td>
                            <td>This is Item number 1-58</td>
                            <td>This is Item number 2-58</td>
                            <td>This is Item number 3-58</td>
                            <td>This is Item number 4-58</td>
                            <td>This is Item number 5-58</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>59</td>
                            <td>This is Item number 1-59</td>
                            <td>This is Item number 2-59</td>
                            <td>This is Item number 3-59</td>
                            <td>This is Item number 4-59</td>
                            <td>This is Item number 5-59</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>60</td>
                            <td>This is Item number 1-60</td>
                            <td>This is Item number 2-60</td>
                            <td>This is Item number 3-60</td>
                            <td>This is Item number 4-60</td>
                            <td>This is Item number 5-60</td>
                        </tr>
                    </tbody>
                </table>
                <div className="pagination">
                    <label for="table_radio_1">&laquo; Previous</label>
                    <label for="table_radio_0" id="table_pager_0">1</label>
                    <label for="table_radio_1" id="table_pager_1">2</label>
                    <label className="active" for="table_radio_2" id="table_pager_2">3</label>
                    <label for="table_radio_3" id="table_pager_3">4</label>
                    <label for="table_radio_4" id="table_pager_4">5</label>
                    <label for="table_radio_3">Next &raquo;</label>
                </div>
                <input className="table-radio" type="radio" name="table_radio" id="table_radio_3" />
                <div className="table-display">Showing 61 to 80
                    of 95 items
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th>
                            <th>FIRST HEADER</th>
                            <th>SECOND HEADER</th>
                            <th>THIRD HEADER</th>
                            <th>FOURTH HEADER</th>
                            <th>FIFTH HEADER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>61</td>
                            <td>This is Item number 1-61</td>
                            <td>This is Item number 2-61</td>
                            <td>This is Item number 3-61</td>
                            <td>This is Item number 4-61</td>
                            <td>This is Item number 5-61</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>62</td>
                            <td>This is Item number 1-62</td>
                            <td>This is Item number 2-62</td>
                            <td>This is Item number 3-62</td>
                            <td>This is Item number 4-62</td>
                            <td>This is Item number 5-62</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>63</td>
                            <td>This is Item number 1-63</td>
                            <td>This is Item number 2-63</td>
                            <td>This is Item number 3-63</td>
                            <td>This is Item number 4-63</td>
                            <td>This is Item number 5-63</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>64</td>
                            <td>This is Item number 1-64</td>
                            <td>This is Item number 2-64</td>
                            <td>This is Item number 3-64</td>
                            <td>This is Item number 4-64</td>
                            <td>This is Item number 5-64</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>65</td>
                            <td>This is Item number 1-65</td>
                            <td>This is Item number 2-65</td>
                            <td>This is Item number 3-65</td>
                            <td>This is Item number 4-65</td>
                            <td>This is Item number 5-65</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>66</td>
                            <td>This is Item number 1-66</td>
                            <td>This is Item number 2-66</td>
                            <td>This is Item number 3-66</td>
                            <td>This is Item number 4-66</td>
                            <td>This is Item number 5-66</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>67</td>
                            <td>This is Item number 1-67</td>
                            <td>This is Item number 2-67</td>
                            <td>This is Item number 3-67</td>
                            <td>This is Item number 4-67</td>
                            <td>This is Item number 5-67</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>68</td>
                            <td>This is Item number 1-68</td>
                            <td>This is Item number 2-68</td>
                            <td>This is Item number 3-68</td>
                            <td>This is Item number 4-68</td>
                            <td>This is Item number 5-68</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>69</td>
                            <td>This is Item number 1-69</td>
                            <td>This is Item number 2-69</td>
                            <td>This is Item number 3-69</td>
                            <td>This is Item number 4-69</td>
                            <td>This is Item number 5-69</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>70</td>
                            <td>This is Item number 1-70</td>
                            <td>This is Item number 2-70</td>
                            <td>This is Item number 3-70</td>
                            <td>This is Item number 4-70</td>
                            <td>This is Item number 5-70</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>71</td>
                            <td>This is Item number 1-71</td>
                            <td>This is Item number 2-71</td>
                            <td>This is Item number 3-71</td>
                            <td>This is Item number 4-71</td>
                            <td>This is Item number 5-71</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>72</td>
                            <td>This is Item number 1-72</td>
                            <td>This is Item number 2-72</td>
                            <td>This is Item number 3-72</td>
                            <td>This is Item number 4-72</td>
                            <td>This is Item number 5-72</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>73</td>
                            <td>This is Item number 1-73</td>
                            <td>This is Item number 2-73</td>
                            <td>This is Item number 3-73</td>
                            <td>This is Item number 4-73</td>
                            <td>This is Item number 5-73</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>74</td>
                            <td>This is Item number 1-74</td>
                            <td>This is Item number 2-74</td>
                            <td>This is Item number 3-74</td>
                            <td>This is Item number 4-74</td>
                            <td>This is Item number 5-74</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>75</td>
                            <td>This is Item number 1-75</td>
                            <td>This is Item number 2-75</td>
                            <td>This is Item number 3-75</td>
                            <td>This is Item number 4-75</td>
                            <td>This is Item number 5-75</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>76</td>
                            <td>This is Item number 1-76</td>
                            <td>This is Item number 2-76</td>
                            <td>This is Item number 3-76</td>
                            <td>This is Item number 4-76</td>
                            <td>This is Item number 5-76</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>77</td>
                            <td>This is Item number 1-77</td>
                            <td>This is Item number 2-77</td>
                            <td>This is Item number 3-77</td>
                            <td>This is Item number 4-77</td>
                            <td>This is Item number 5-77</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>78</td>
                            <td>This is Item number 1-78</td>
                            <td>This is Item number 2-78</td>
                            <td>This is Item number 3-78</td>
                            <td>This is Item number 4-78</td>
                            <td>This is Item number 5-78</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>79</td>
                            <td>This is Item number 1-79</td>
                            <td>This is Item number 2-79</td>
                            <td>This is Item number 3-79</td>
                            <td>This is Item number 4-79</td>
                            <td>This is Item number 5-79</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>80</td>
                            <td>This is Item number 1-80</td>
                            <td>This is Item number 2-80</td>
                            <td>This is Item number 3-80</td>
                            <td>This is Item number 4-80</td>
                            <td>This is Item number 5-80</td>
                        </tr>
                    </tbody>
                </table>
                <div className="pagination">
                    <label for="table_radio_2">&laquo; Previous</label>
                    <label for="table_radio_0" id="table_pager_0">1</label>
                    <label for="table_radio_1" id="table_pager_1">2</label>
                    <label for="table_radio_2" id="table_pager_2">3</label>
                    <label className="active" for="table_radio_3" id="table_pager_3">4</label>
                    <label for="table_radio_4" id="table_pager_4">5</label>
                    <label for="table_radio_4">Next &raquo;</label>
                </div>
                <input className="table-radio" type="radio" name="table_radio" id="table_radio_4" />
                <div className="table-display">Showing 81 to 85
                    of 95 items
                </div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th>
                            <th>FIRST HEADER</th>
                            <th>SECOND HEADER</th>
                            <th>THIRD HEADER</th>
                            <th>FOURTH HEADER</th>
                            <th>FIFTH HEADER</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>81</td>
                            <td>This is Item number 1-81</td>
                            <td>This is Item number 2-81</td>
                            <td>This is Item number 3-81</td>
                            <td>This is Item number 4-81</td>
                            <td>This is Item number 5-81</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>82</td>
                            <td>This is Item number 1-82</td>
                            <td>This is Item number 2-82</td>
                            <td>This is Item number 3-82</td>
                            <td>This is Item number 4-82</td>
                            <td>This is Item number 5-82</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>83</td>
                            <td>This is Item number 1-83</td>
                            <td>This is Item number 2-83</td>
                            <td>This is Item number 3-83</td>
                            <td>This is Item number 4-83</td>
                            <td>This is Item number 5-83</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>84</td>
                            <td>This is Item number 1-84</td>
                            <td>This is Item number 2-84</td>
                            <td>This is Item number 3-84</td>
                            <td>This is Item number 4-84</td>
                            <td>This is Item number 5-84</td>
                        </tr>
                        <tr>
                            <td>
                                <input type="checkbox" />
                            </td>
                            <td>85</td>
                            <td>This is Item number 1-85</td>
                            <td>This is Item number 2-85</td>
                            <td>This is Item number 3-85</td>
                            <td>This is Item number 4-85</td>
                            <td>This is Item number 5-85</td>
                        </tr>
                    </tbody>
                </table>
                <div className="pagination">
                    <label for="table_radio_3">&laquo; Previous</label>
                    <label for="table_radio_0" id="table_pager_0">1</label>
                    <label for="table_radio_1" id="table_pager_1">2</label>
                    <label for="table_radio_2" id="table_pager_2">3</label>
                    <label for="table_radio_3" id="table_pager_3">4</label>
                    <label className="active" for="table_radio_4" id="table_pager_4">5</label>
                    <label className="disabled" for="table_radio_5">Next &raquo;</label>
                </div>
            </div>
        </div>

    )

}